from django.test import TestCase
import requests
from .views import call_google_api_free

class QuestionModelTests(TestCase):
    def test_call_api(self):
        call_google_api_free('Ối dồi ôi', 'en', 'auto')