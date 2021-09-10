from django import forms
from .models import *


class OrderForm(forms.ModelForm):

	error_css_class = 'text-xs font-weight-bold text-danger text-uppercase '

	class Meta:

		model=Order
		fields=('nom','tel','adresse','ville')

	def __init__(self, *args, **kwargs):
		super(OrderForm, self).__init__(*args, **kwargs)
		for field in self.fields.values():
			field.widget.attrs['class'] = 'form-control form-control-user'

		self.fields['nom'].label=''
		self.fields['nom'].widget.attrs['placeholder'] = 'Nom & Prénom'
		self.fields['nom'].error_messages['required']='Veuillez renseigner votre nom et prénom'
		
		self.fields['tel'].label='Numéro Téléphone'
		self.fields['tel'].widget.attrs['placeholder'] = 'Numéro Téléphone'
		self.fields['adresse'].label='Adresse'
		self.fields['adresse'].widget.attrs['placeholder'] = 'Adresse'
		self.fields['ville'].label='Ville'
		self.fields['ville'].widget.attrs['placeholder'] = 'Ville'


	