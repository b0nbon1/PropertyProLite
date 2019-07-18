/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';
import Db from '../../database';

let token, wrongUser;

chai.use(chaiHttp);
chai.should();
before('generate JWT', () => {
    wrongUser = jwt.newToken({ email: 'testtest@test.com', id: 3 });
});
before('generate token', () => {
    token = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
describe('Delete property', () => {
    it('should delete his/her own posts', (done) => {
        chai.request(app)
            .delete('/api/v2/property/1')
            .set('authorization', `Bearer ${wrongUser}`)
            .end((err, res) => {
                res.should.have.status(406);
                res.body.should.be.a('object');
                res.body.error.should.equal('None of the ads with such id belongs to you');
                if (err) return done();
                done();
            });
    });
    it('should delete advert successfully', (done) => {
        chai.request(app)
            .delete('/api/v2/property/1')
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.equal('delete property successfully');
                if (err) return done();
                done();
            });
    });
    it('confirm the advert is deleted', (done) => {
        chai.request(app)
            .get('/api/v2/property/1')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.error.should.equal('Property with such id does not exists');
                if (err) return done();
                done();
            });
    });
    after('RollBack all the tables', async () => {
        await Db.dropTables();
    });
});
