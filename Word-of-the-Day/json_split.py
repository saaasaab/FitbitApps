import json
with open('word_list.json') as f:
  data = json.load(f)

maxLen=0
maxLenIndex=0

minLen=100
minLenIndex=100


for index, word in enumerate(data):
    #print(index,word["Word"],len(word["Word"]))
    if(len(word["Word"])>maxLen):
        maxLen = len(word["Word"])
        maxLenIndex = index

    if len(word["Word"])<minLen:
        minLen = len(word["Word"])
        minLenIndex = index

print(maxLenIndex,maxLen,minLenIndex,minLen)
    
    #with open("words/"+str(index)+".json", 'w') as f:
    #    json.dump(word, f)
    
    #print(data[1])
