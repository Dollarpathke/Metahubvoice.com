// Mock Database for Development (No MongoDB Required)
// This allows you to test the application without MongoDB

const users = [];
const courses = [];
const purchases = [];

// Mock User Model
class MockUser {
    constructor(data) {
        this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        this.email = data.email;
        this.password = data.password;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.role = data.role || 'user';
        this.isVerified = data.isVerified || false;
        this.purchases = [];
        this.createdAt = new Date();
        this.lastLogin = null;
    }

    static async create(data) {
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        const user = new MockUser(data);
        users.push(user);
        return user;
    }

    static async findOne(query) {
        return users.find(u => {
            if (query.email) return u.email === query.email;
            if (query._id) return u._id === query._id;
            return false;
        });
    }

    static async findById(id) {
        return users.find(u => u._id === id);
    }

    static async countDocuments(query = {}) {
        if (query.role) return users.filter(u => u.role === query.role).length;
        return users.length;
    }

    async comparePassword(candidatePassword) {
        const bcrypt = require('bcryptjs');
        return await bcrypt.compare(candidatePassword, this.password);
    }

    async save() {
        const index = users.findIndex(u => u._id === this._id);
        if (index !== -1) users[index] = this;
        return this;
    }

    toJSON() {
        const obj = { ...this };
        delete obj.password;
        return obj;
    }
}

// Mock Course Model
class MockCourse {
    constructor(data) {
        this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        Object.assign(this, data);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static async create(data) {
        const course = new MockCourse(data);
        courses.push(course);
        return course;
    }

    static async insertMany(data) {
        const newCourses = data.map(d => new MockCourse(d));
        courses.push(...newCourses);
        return newCourses;
    }

    static find(query = {}) {
        let results = [...courses];
        if (query.isActive !== undefined) results = results.filter(c => c.isActive === query.isActive);
        
        // Return a promise-like object with chainable methods
        const promise = Promise.resolve(results);
        
        promise.sort = (sortObj) => {
            if (sortObj.createdAt === -1) {
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (sortObj.createdAt === 1) {
                results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }
            return Promise.resolve(results);
        };
        
        promise.limit = (num) => {
            results = results.slice(0, num);
            return Promise.resolve(results);
        };
        
        promise.skip = (num) => {
            results = results.slice(num);
            return Promise.resolve(results);
        };
        
        return promise;
    }

    static async findOne(query) {
        return courses.find(c => {
            if (query.courseId) return c.courseId === query.courseId;
            if (query._id) return c._id === query._id;
            return false;
        });
    }

    static async findById(id) {
        return courses.find(c => c._id === id);
    }

    static async deleteMany() {
        courses.length = 0;
    }

    static async countDocuments() {
        return courses.length;
    }

    async save() {
        const index = courses.findIndex(c => c._id === this._id);
        if (index !== -1) courses[index] = this;
        return this;
    }
}

// Mock Purchase Model
class MockPurchase {
    constructor(data) {
        this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        Object.assign(this, data);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static async create(data) {
        const purchase = new MockPurchase(data);
        purchases.push(purchase);
        return purchase;
    }

    static async find(query = {}) {
        let results = [...purchases];
        if (query.userEmail) results = results.filter(p => p.userEmail === query.userEmail);
        if (query.status) results = results.filter(p => p.status === query.status);
        
        const queryObj = {
            populate: (field) => queryObj,
            sort: (sortObj) => {
                if (sortObj.createdAt === -1) {
                    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortObj.createdAt === 1) {
                    results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                }
                return queryObj;
            },
            limit: (num) => {
                results = results.slice(0, num);
                return queryObj;
            },
            skip: (num) => {
                results = results.slice(num);
                return queryObj;
            },
            exec: () => Promise.resolve(results),
            then: (resolve) => resolve(results)
        };
        
        return queryObj;
    }

    static async findOne(query) {
        return purchases.find(p => {
            if (query.orderId) return p.orderId === query.orderId;
            if (query._id) return p._id === query._id;
            return false;
        });
    }

    static async findById(id) {
        const purchase = purchases.find(p => p._id === id);
        if (purchase) {
            return {
                ...purchase,
                populate: () => ({
                    populate: () => purchase
                })
            };
        }
        return null;
    }

    static async countDocuments(query = {}) {
        if (query.status) return purchases.filter(p => p.status === query.status).length;
        return purchases.length;
    }

    static async aggregate(pipeline) {
        const completed = purchases.filter(p => ['completed', 'approved'].includes(p.status));
        const total = completed.reduce((sum, p) => sum + p.amount, 0);
        return [{ _id: null, total }];
    }

    async save() {
        const index = purchases.findIndex(p => p._id === this._id);
        if (index !== -1) purchases[index] = this;
        return this;
    }
}

console.log('⚠️  Using MOCK DATABASE (No MongoDB required)');
console.log('📝 This is for development/testing only');
console.log('🔄 Data will be lost when server restarts\n');

module.exports = {
    User: MockUser,
    Course: MockCourse,
    Purchase: MockPurchase,
    connect: async () => {
        console.log('✅ Mock Database connected');
        return Promise.resolve();
    }
};
