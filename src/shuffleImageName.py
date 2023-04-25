import random
import json

# opening the file in read mode
# file = open("uniqueImageName.txt", "r")
file = open("physicalSignFacial.txt", "r")
  
# # reading the file
data_unique = file.read()

data_into_list = data_unique.split("\n")
data_into_list.sort()

data_unique = list(set(data_into_list))

# random.shuffle(data_unique)

# print(data_into_list)
file.close()


batch_list = []
for item in data_into_list:
    dict = {
        "value": item,
        "label": item
    }
    batch_list.append(dict)
print(batch_list)
with open('physicalSignFacial.json', 'w') as f:
    json.dump(batch_list, f, indent=4)
 
# declaring list
# random.seed(10)
# images = open("Disconnection.txt", "r")
# images_file = images.read()
# images_list = images_file.split("\n")
# print(images_list)
 
# initializing the value of n
n = 15
 
# printing n elements from list
# images_list_random = random.sample(images_list, n)
# open file in write mode
# with open(r'RandomDisconnectionNew.txt', 'w') as fp:
#     for item in images_list_random:
#         # write each item on a new line
#         fp.write("%s\n" % item)
#     print('Done')

# json_list = []
# i = 0
# batch = 1
# for item in images_list:
#     if i == 15:
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
# with open('experiment195.json', 'w') as f:
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

