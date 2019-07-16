import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../Mockdata/user';
import Db from '../../database';

chai.use(chaiHttp);
chai.should();
describe('Login', () => {
    before('Create tables', async () => {
        await Db.initDb();
    });
    before('signup user', () => (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send(data.user13)
            .end((err) => {
                if (err) return done();
                done();
            });
    });
    before('generste new user', (done) => {
        chai.request(app)
            .post('/api/v2/auth/signup')
            .send(data.user15)
            .end((err) => {
                if (err) return done();
                done();
            });
    });
    it('should Login user successfully', (done) => {
        chai.request(app)
            .post('/api/v2/auth/login')
            .send(data.user16)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.message.should.equal('successfully logged in');
                if (err) return done();
                done();
            });
    });
    it('should check user email', (done) => {
        chai.request(app)
            .post('/api/v2/auth/login')
            .send(data.user17)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.error.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check all fields present', (done) => {
        chai.request(app)
            .post('/api/v2/auth/login')
            .send(data.user18)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.error.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should check user password', (done) => {
        chai.request(app)
            .post('/api/v2/auth/login')
            .send(data.user19)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.error.should.equal('Please fill all the fields');
                if (err) return done();
                done();
            });
    });
    it('should confirm if user exists', (done) => {
        chai.request(app)
            .post('/api/v2/auth/login')
            .send(data.user20)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.error.should.equal('User is not registered. Sign up to create account');
                if (err) return done();
                done();
            });
    });
    it('should check if the password matches', (done) => {
        chai.request(app)
            .post('/api/v2/auth/login')
            .send(data.user21)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.error.should.equal('wrong password!');
                if (err) return done();
                done();
            });
    });
});
