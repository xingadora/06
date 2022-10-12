# credit: https://github.com/mdminhazulhaque/html-table-to-json


import json

def html_to_json(content, indent=None):
    soup = content
    rows = soup.find_all("tr")

    headers = {}
    thead = soup.find("thead")
    if thead:
        thead = thead.find_all("th")
        for i in range(len(thead)):
            headers[i] = thead[i].text.strip().lower()
    data = []
    for row in rows:
        cells = row.find_all("td")
        if thead:
            items = {}
            if len(cells) > 0:
                for index in headers:
                    items[headers[index]] = cells[index].text
        else:
            items = []
            for index in cells:
                items.append(index.text.strip())
        if items:
            data.append(items)
    return json.dumps(data, indent=indent)