import random
import json

# opening the file in read mode
# file = open("uniqueImageName.txt", "r")
file = open("physicalSignBody.txt", "r")
  
# reading the file
data_unique = file.read()

data_into_list = data_unique.split("\n")
# data_into_list.sort()

# data_unique = list(set(data_into_list))

# random.shuffle(data_unique)

# print(data_into_list)
# file.close()

batch_list = []
for item in data_into_list:
    dict = {
        "value": item,
        "label": item
    }
    batch_list.append(dict)
print(batch_list)
with open('physicalSignBody.json', 'w') as f:
    json.dump(batch_list, f, indent=4)

# open file in write mode
# with open(r'uniquePhysicalSignList.txt', 'w') as fp:
#     for item in data_into_list:
#         # write each item on a new line
#         fp.write("%s\n" % item)
#     print('Done')

# json_list = []
# i = 0
# batch = 1
# for item in data_into_list:
#     if i == 100:
#         i = 0
#         batch += 1
#     boxNum = item.split('.').pop(0)[-1]
#     dict = {
#     "title": item,
#     "boxNum": boxNum,
#     "batch": batch
#     }
#     json_list.append(dict)
#     i += 1

# print(json_list)
# with open('data.json', 'w') as f:
#     json.dump(json_list, f, indent=4)

# batch_list = []
# batch = 1
# while batch < 62:
#     dict = {
#         "batch": batch
#     }
#     batch_list.append(dict)
#     batch += 1
# print(batch_list)
# with open('batchList.json', 'w') as f:
#     json.dump(batch_list, f, indent=4)

