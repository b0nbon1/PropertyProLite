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
