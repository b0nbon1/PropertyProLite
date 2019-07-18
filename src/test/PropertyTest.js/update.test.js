/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';
import data from '../Mockdata/property';

let token, wrongUser;

chai.use(chaiHttp);
chai.should();
before('generate JWT for wronng user', () => {
    wrongUser = jwt.newToken({ email: 'testtest@test.com', id: 6 });
});
before('generate token', () => {
    token = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
describe('Update advert', () => {
    it('should update advert successfully', (done) => {
        chai.request(app)
            .patch('/api/v2/property/1')
            .send(data.property1)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('successfully updated advert');
                if (err) return done();
                done();
            });
    });
    it('should update his/her own posts', (done) => {
        chai.request(app)
            .patch('/api/v2/property/1')
            .send(data.property1)
            .set('authorization', `Bearer ${wrongUser}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.error.should.equal('None of the ads with such id belongs to you');
                if (err) return done();
                done();
            });
    });
    it('should property should have Valid price', (done) => {
        chai.request(app)
            .patch('/api/v2/property/1')
            .send(data.property12)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.error.should.equal('Price should be a number');
                if (err) return done();
                done();
            });
    });
    it('should property should have Valid price', (done) => {
        chai.request(app)
            .patch('/api/v2/property/1')
            .send()
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.error.should.equal('Please fill the fields');
                if (err) return done();
                done();
            });
    });
});
