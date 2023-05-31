# Boost Backend Exercise


## Details


Supported Files Types:
- jpeg/jpg
- png
- gif

### Endpoints:

##### POST /image

upload image

Payload

form-data (key = image, value = file)


Response 

```

{
    "data": {
        "id": 1
    }
}

```

##### GET /image/all

get list of images

Response 

```

{
    "data": [
            {
                "id": 1,
                "originalName": "chrollo_lucilfer_v2__hunter_x_hunter__minimalism_by_greenmapple17_d8kymsg.png",
                "mimeType": "image/png",
                "fileName": "f01cd134f40761a4d3b6f4bbb80fe491",
                "destination": "uploads",
                "createdAt": "2023-05-31T06:59:27.000Z",
                "updatedAt": "2023-05-31T06:59:27.000Z"
            }
        ]
}

```

##### GET /image/:id?format=xyz

get image file

supported formats: jpeg/jpg, png, giff

Response (Image File)



## How to run


#### 1.


Set up the enviroment variables, rename .env.sample => .env


#### 2.


Next the database should be spun up:


Within the project repository run


```
docker-compose up -d
```

be sure to check port 3306 is available.

#### 3.

It takes several minutes for the database to be accessible from Node, so i reccomend waiting some time

before running:

```
npm i
npm run dev
```

Once you've done that you can reach the endpoints on localhost:3000

Test Call


GET http://localhost:3000

Response: "Lets do this!"


#### Optional.

Testing, you can run the unit tests written for this project

To test run:

```
npm t
```


