import requests
from django.shortcuts import render
from pptx import Presentation
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer
from .models import Todo, Files
from .serializers import FilesSerializer
from django.conf import settings
from urllib.parse import unquote

# Create your views here.
@api_view(['GET'])
def translate(request, file_name, source, target):
    print(unquote(file_name) + " " + source + " " + target)
    replace_text(unquote(file_name), source, target)
    return Response(unquote(file_name), status=status.HTTP_200_OK)

@api_view(['GET'])
def download(request, file_name):
    file_path = settings.MEDIA_ROOT + '/translated/' + unquote(file_name)
    file_pointer = open(file_path, 'r')
    response = Response(file_pointer, content_type='application/vnd.openxmlformats-officedocument.presentationml.presentation')
    response['Content-Disposition'] = 'attachment; filename='+ unquote(file_name)
    return response


def replace_text(file_name, source, target):
    file_path = settings.MEDIA_ROOT
    prs = Presentation(file_path + '/origin/' + file_name)
    slides = [slide for slide in prs.slides]
    shapes = []

    for slide in slides:
        for shape in slide.shapes:
            shapes.append(shape)
    """Takes dict of {match: replacement, ... } and replaces all matches.
    Currently not implemented for charts or graphics.
    """
    for shape in shapes:
        if shape.has_text_frame:
            text_frame = shape.text_frame
            for paragraph in text_frame.paragraphs:
                for run in paragraph.runs:
                    print(run.text)
                    if is_need_translate(run.text):
                        run.text = call_api(run.text, target, source)
        if shape.has_table:
            for row in shape.table.rows:
                for cell in row.cells:
                    print(cell.text)
                    if is_need_translate(cell.text):
                        cell.text = call_api(cell.text, target, source)
    prs.save(file_path + '/translated/' + file_name)


def call_api(text_translate, target, source='auto'):
    try:
        return text_translate
        # query = {'sl': source, 'tl': target, 'dt': 't', 'client': 'gtx', 'q': text_translate}
        # response = requests.get("https://translate.googleapis.com/translate_a/single", query)
        # return response.json()[0][0][0]
    except Exception as e:
        print(e)
        return text_translate


def is_need_translate(origin_text):
    if any(char.isalpha() for char in origin_text):
        return True
    return False


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
