const knex = require('knex')
const app = require('../src/app');

describe('NomNoms API:', function() {
    let db;

    

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });

    before('cleanup', () => db.raw('TRUNCATE TABLE noms RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE noms RESTART IDENTITY;'));

    after('disconnect from the database', () => db.destroy());

    describe('GET all noms', () => {

        beforeEach('insert some noms', () => {
            return db('noms').insert(noms);
        })

        //relevant
        it('should respond to GET `/api/noms` with an array of noms and status 200', function() {
            return supertest(app)
                .get('/api/noms')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.be.a('array');
                    expect(res.body).to.have.length(noms.length);
                    res.body.forEach((item) => {
                        expect(item).to.be.a('object');
                        expect(item).to.include.keys('id', 'nom_name', 'sub', 'url', 'description', 'author', 'date_created', 'style');
                    });
                });
        });

    });


    describe('GET noms by id', () => {

        beforeEach('insert some noms', () => {
            return db('noms').insert(noms);
        })

        it('should return correct nom when given an id', () => {
            let doc;
            return db('noms')
                .first()
                .then(_doc => {
                    doc = _doc
                    return supertest(app)
                        .get(`/api/noms/${doc.id}`)
                        .set('Authorization', )
                        .expect(200);
                })
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.include.keys('id', 'nom_name', 'sub', 'url', 'description', 'author', 'date_created', 'style');
                    expect(res.body.id).to.equal(doc.id);
                    expect(res.body.nom_name).to.equal(doc.nom_name);
                    expect(res.body.sub).to.equal(doc.sub);
                    expect(res.body.url).to.equal(doc.url);
                    expect(res.body.description).to.equal(doc.description);
                    expect(res.body.author).to.equal(doc.author);
                    expect(res.body.date_created).to.equal(doc.date_created);
                    expect(res.body.style).to.equal(doc.style);
                });
        });

        it('should respond with a 404 when given an invalid id', () => {
            return supertest(app)
                .get('/api/pancakes/aaaaaaaaaaaa')
                .expect(404);
        });

    });

});