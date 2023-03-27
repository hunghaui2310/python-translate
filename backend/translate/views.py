import unittest

import requests
from django.shortcuts import render
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer
from .models import Todo, Files
from .serializers import FilesSerializer
from django.conf import settings
from urllib.parse import unquote
import xml.etree.ElementTree as ET
import os
import re
from python_pptx_text_replacer import TextReplacer

# IS_INVALID_GOOGLE_API = False


# Create your views here.
@api_view(['GET'])
def translate(request, file_name, source, target):
    replace_text(unquote(file_name), source, target)
    return Response(unquote(file_name), status=status.HTTP_200_OK)


@api_view(['GET'])
def download(request, file_name):
    file_path = settings.MEDIA_ROOT + '/translated/' + unquote(file_name)
    file_pointer = open(file_path, 'r')
    response = Response(file_pointer,
                        content_type='application/vnd.openxmlformats-officedocument.presentationml.presentation')
    response['Content-Disposition'] = 'attachment; filename=' + unquote(file_name)
    return response


def save_text_to_file(file_name, text):
    prefix_file_name = os.path.splitext(file_name)[0]
    # save file to temp folder in media folder
    file_path = settings.MEDIA_ROOT
    file = file_path + '/temp/' + prefix_file_name + '.txt'
    if not os.path.exists(file):
        open(file, 'w')
    with open(file, 'a+') as txtFile:
        texts = [x.rstrip() for x in txtFile]
        print('length = ', len(texts))
        if len(texts) > 0:
            for txt in texts:
                if txt != text:
                    txtFile.write(text.strip() + "\n")
        else:
            txtFile.write(text.strip() + "\n")



def create_folder_if_not_exist(folder_name):
    # crete folder if not exist in media folder
    if not os.path.exists(settings.MEDIA_ROOT + "/" + folder_name):
        os.mkdir(settings.MEDIA_ROOT + "/" + folder_name)


def replace_text(file_name, source, target):
    # create folder if not exist
    create_folder_if_not_exist('translated')  # to save file after translating
    create_folder_if_not_exist('temp')  # to save file temporary when extract text of pptx file
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
    read_shape(shapes, file_name)
    # after extract text from .pptx to .txt file, read .txt file and translate it
    translate_and_replace(file_name, source, target)
    # delete file txt after translate success
    prefix_file_name = os.path.splitext(file_name)[0]
    # if os.path.exists(file_path + '/temp/' + prefix_file_name + '.txt'):
    # os.remove(file_path + '/temp/' + prefix_file_name + '.txt')


def translate_and_replace(file_name, source, target):
    path = settings.MEDIA_ROOT
    prefix_file_name = os.path.splitext(file_name)[0]
    with open(path + '/temp/' + prefix_file_name + '.txt', "r") as myfile:
        data = myfile.read().splitlines()
        replacer = TextReplacer(path + '/origin/' + file_name, slides='', tables=True, charts=True, textframes=True)
        arr = []
        for text in data:
            text_out = auto_translate(text, target, source)
            if text != text_out:
                arr = [(text.strip(), text_out.strip()), *arr]
        replacer.replace_text(arr)
        replacer.write_presentation_to_file(path + '/translated/' + file_name)


def read_shape(shapes, file_name=''):
    for shape in shapes:
        if shape.has_table:
            tbl = shape.table
            row_count = len(tbl.rows)
            col_count = len(tbl.columns)
            for r in range(0, row_count):
                for c in range(0, col_count):
                    cell = tbl.cell(r, c)
                    paragraphs = cell.text_frame.paragraphs
                    for paragraph in paragraphs:
                        if is_need_translate(paragraph.text):
                            save_text_to_file(file_name, paragraph.text)
        if shape.has_text_frame:
            text_frame = shape.text_frame
            for paragraph in text_frame.paragraphs:
                if is_need_translate(paragraph.text):
                    save_text_to_file(file_name, paragraph.text)
        # check shape is AutoShape
        if shape.shape_type == MSO_SHAPE_TYPE.AUTO_SHAPE:
            if shape.has_text_frame:
                text_frame = shape.text_frame
                for paragraph in text_frame.paragraphs:
                    if is_need_translate(paragraph.text):
                        save_text_to_file(file_name, paragraph.text)

        # Check if the shape is a GraphicalFrame
        if shape.shape_type == 7:
            graphical_frame = shape._element
            frame_xml = graphical_frame.xml
            # Parse the XML data to extract the text
            root = ET.fromstring(frame_xml)
            for elem in root.iter():
                if is_need_translate(elem.text):
                    save_text_to_file(file_name, elem.text)

        # Check if the shape is a group
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            read_shape(shape.shapes, file_name)


def auto_translate(text_translate, target, source='auto'):
    if not settings.IS_TRANSLATE:
        return text_translate
    text_translated = call_google_api_free(text_translate, target, source)
    if text_translated == "":
        text_translated = call_google_api_v2(text_translate, target, source)
    return text_translated


def call_google_api_free(text_translate, target, source='auto'):
    query = {'sl': source, 'tl': target, 'dt': 't', 'client': 'gtx', 'q': text_translate}
    response = requests.get("https://translate.googleapis.com/translate_a/single", query)
    if response.ok:
        parse_response = response.json()
        return parse_response[0][0][0]
    else:
        return ""


def call_google_api_v2(text_translate, target, source=''):
    if source == 'auto':
        source = ''
    query = {'source': source, 'target': target, 'q': text_translate, 'key': settings.GOOGLE_API_KEY}
    response = requests.get("https://www.googleapis.com/language/translate/v2", query)
    if response.ok:
        parse_response = response.json().data.translations
        if parse_response[0].detectedSourceLanguage == target:
            return ""
        return parse_response[0].translatedText
    else:
        return text_translate


def is_need_translate(origin_text):
    # check is special character
    if any(char.isalpha() for char in origin_text):
        # check is link
        if is_not_link(origin_text):
            return True
    return False


def is_not_link(origin_text):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, origin_text) is None


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
