/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';


chai.use(chaiHttp);
chai.should();
describe('Extra Routes', () => {
    it('Should confirm Home Route is working', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('Welcome to Property Pro Lite');
                if (err) return done();
                done();
            });
    });
    it('should check Wrong Routes', (done) => {
        chai.request(app)
            .get('/api/v1/ty467ft')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.error.should.equal('Invalid route');
                if (err) return done();
                done();
            });
    });
    it('should check Wrong methods', (done) => {
        chai.request(app)
            .patch('/api/v2/auth/login')
            .end((err, res) => {
                res.should.have.status(405);
                res.body.should.be.a('object');
                res.body.error.should.equal('Invalid Method');
                if (err) return done();
                done();
            });
    });
});
