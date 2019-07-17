import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from '../../utils/helpers/jwt';
import app from '../../../app';
import data from '../Mockdata/property';

let token;
chai.use(chaiHttp);
chai.should();

describe('No Properties', () => {
    it('should test if no properties', (done) => {
        chai.request(app)
            .get('/api/v2/properties')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.a('object');
                res.body.error.should.equal('No properties available');
                if (err) return done();
                done();
            });
    });
});
describe('get all adverts', () => {
    before('generate token', () => {
        token = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
    });
    before('should create new ad successfully', (done) => {
        chai.request(app)
            .post('/api/v2/property')
            .send(data.property1)
            .set('authorization', `Bearer ${token}`)
            .end((err) => {
                if (err) return done();
                done();
            });
    });
    it('should get all advert successfully', (done) => {
        chai.request(app)
            .get('/api/v2/properties')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('got all properties successfully');
                if (err) return done();
                done();
            });
    });
});

describe('get specific adverts', () => {
    it('should get specific advert successfully', (done) => {
        chai.request(app)
            .get('/api/v2/property/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('got property successfully');
                if (err) return done();
                done();
            });
    });
    it('should find the property with the id', (done) => {
        chai.request(app)
            .get('/api/v2/property/14')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.error.should.equal('Property with such id does not exists');
                if (err) return done();
                done();
            });
    });
});
describe('Get specific property', () => {
    it('should get properties by specific type', (done) => {
        chai.request(app)
            .get('/api/v2/property?type=apartment')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('got specific type Successful');
                if (err) return done();
                done();
            });
    });
    it('property type should exist should', (done) => {
        chai.request(app)
            .get('/api/v2/property?type=bedroom')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.error.should.equal('adverts with this type does not exists');
                if (err) return done();
                done();
            });
    });
    it('should have the query', (done) => {
        chai.request(app)
            .get('/api/v2/property?type=')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.error.should.equal('Please ensure there is query type made');
                if (err) return done();
                done();
            });
    });
});
