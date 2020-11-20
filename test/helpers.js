let nom_users = [{
    "id": 1,
    "fullname": "lou line",
    "username": "loulou",
    "password": "password",
    "date_created": new Date('2029-01-22T16:28:32.615Z')
},
{
    "id": 2,
    "fullname": "lou line",
    "username": "loulou",
    "password": "password",
    "date_created": new Date('2029-01-22T16:28:32.615Z')
},
{
    "id": 3,
    "fullname": "lou line",
    "username": "loulou",
    "password": "password",
    "date_created": new Date('2029-01-22T16:28:32.615Z')
},
]

let noms = [{
    "id": 1,
    "nom_name": "nom 1",
    "sub": "French Crepes",
    "url": "https://www.goodcrepes.com",
    "description": "good crepes",
    "author": 1,
    "date_created": new Date('2029-01-22T16:28:32.615Z'),
    "style": "Recipe"
},
{
    "id": 2,
    "nom_name": "nom 2",
    "sub": "butter",
    "url": "https://www.goodbutter.com",
    "description": "good butter",
    "author": 2,
    "date_created": new Date('2029-01-22T16:28:32.615Z'),
    "style": "Nom"
},
{
    "id": 3,
    "nom_name": "nom 3",
    "sub": "coffee",
    "url": "https://www.goodcoffee.com",
    "description": "good coffee",
    "author": 3,
    "date_created": new Date('2029-01-22T16:28:32.615Z'),
    "style": "Recipe"
},
{
    "id": 4,
    "nom_name": "nom 4",
    "sub": "candy",
    "url": "https://www.goodcandy.com",
    "description": "good candy",
    "author": 1,
    "date_created": new Date('2029-01-22T16:28:32.615Z'),
    "style": "Nom"
},
{
    "id": 5,
    "nom_name": "nom 5",
    "sub": "French bread",
    "url": "https://www.goodbread.com",
    "description": "good bread",
    "author": 2,
    "date_created": new Date('2029-01-22T16:28:32.615Z'),
    "style": "Nom"
}
]

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
}