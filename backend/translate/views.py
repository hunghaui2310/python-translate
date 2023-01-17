from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from pptx import Presentation
import requests
from .serializers import TodoSerializer
from .models import Todo, Files
from .serializers import FilesSerializer

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer

    def create(self, request, *args, **kwargs):
        # here you have your post data in request.data
        data = request.data
        # you can do some action here just before create action
        # after that you can call super method or return your response
        source = self.request.query_params.get('source')
        target = self.request.query_params.get('target')

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)


    # def replace_text(self):
    #     prs = Presentation('ggOut.pptx')
    #     slides = [slide for slide in prs.slides]
    #     shapes = []
    #
    #     for slide in slides:
    #         for shape in slide.shapes:
    #             shapes.append(shape)
    #     """Takes dict of {match: replacement, ... } and replaces all matches.
    #     Currently not implemented for charts or graphics.
    #     """
    #     for shape in shapes:
    #         if shape.has_text_frame:
    #             text_frame = shape.text_frame
    #             for paragraph in text_frame.paragraphs:
    #                 for run in paragraph.runs:
    #                     print(run.text)
    #                     # if is_need_translate(run.text):
    #                     #     run.text = call_api(run.text)
    #         if shape.has_table:
    #             for row in shape.table.rows:
    #                 for cell in row.cells:
    #                     print(cell.text)
    #                     # if is_need_translate(cell.text):
    #                         # cell.text = call_api(cell.text)
    #     prs.save('output.pptx')
    #
    # def call_api(self, text_translate, source, target):
    #     # return text_translate
    #     query = {'sl': source, 'tl': target, 'dt': 't', 'client': 'gtx', 'q': text_translate}
    #     response = requests.get("https://translate.googleapis.com/translate_a/single", query)
    #     return response.json()[0][0][0]
    #
    # def is_need_translate(self, origin_text):
    #     if any(char.isalpha() for char in origin_text):
    #         return True
    #     return False