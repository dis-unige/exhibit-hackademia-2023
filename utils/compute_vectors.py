import json

base_words = {
    'sexualité': '100000000000000',
    'anatomie': '010000000000000',
    'violence': '001000000000000',
    'reproduction': '000100000000000',
    'maladie': '000010000000000',
    'psychologie': '000001000000000',
    'relation': '000000100000000',
    'travail': '000000010000000',
    'pornographie': '000000001000000',
    'orientation sexuelle': '000000000100000',
    'genre': '000000000010000',
    'géographie': '000000000001000',
    'plaisir': '000000000000100',
    'art': '000000000000010',
    'sociologie': '000000000000001',
}

base_words = {word: [int(e) for e in v] for word, v in base_words.items()}

with open("combinations.txt","r") as fr:
    combinations = fr.read().split("\n")

data = []
for comb in combinations:
    combination = {}

    query = comb.split("=")[0]
    combination["query"] = query.strip()

    words = query.split("+")
    words = [word.strip().lower() for word in words]
    words = [base_words[word] for word in words]

    vector = []
    for i in range(len(words[0])):
        e = 0
        for word in words:
            e += word[i]
        vector.append(e)
    combination["vector"] = "".join([str(v) for v in vector])

    query = comb.split("=")[1]
    words = query.split(";")
    words = [word.strip() for word in words]
    combination["results"] = words
 
    data.append(combination)

resulting_words = {}
for comb in data:
    for res in comb["results"]:
        resulting_words[res] = comb["vector"]

with open("terms.json","w") as fw:
    fw.write(json.dumps(resulting_words, ensure_ascii=False, indent=4))

    
