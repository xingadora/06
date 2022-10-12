from htmltojson import *
import requests
from bs4 import BeautifulSoup, NavigableString


pokemon_name = 'pikachu' # change this to whatever pokemon you want

response = requests.get(
    f'https://pokemondb.net/pokedex/{pokemon_name}/moves/1')

soup = BeautifulSoup(response.text, 'html.parser')

table = soup.find("table")


for element in table.find_all(string="—"):
    element.string.replace_with("none")

for element in table.find_all(string="∞"):
    element.string.replace_with("infinite")


for element in table.find_all(attrs={"data-sort-value": "physical"}):
    element.insert(0, NavigableString("physical"))

for element in table.find_all(attrs={"data-sort-value": "special"}):
    element.insert(0, NavigableString("special"))

for element in table.find_all(attrs={"data-sort-value": "status"}):
    element.insert(0, NavigableString("status"))


with open("randomfile.json", "a") as o:
    o.write(html_to_json(table))