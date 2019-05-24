var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const userFacade = require("../facades/userFacade");
const loginFacade = require("../facades/loginFacade");
const blogFacade = require("../facades/blogFacade");

const schema = buildSchema(`
    type User{
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        job: [Job]
        created: String
        lastUpdated: String
    }

    type Job{
        type: String
        company: String
        companyUrl: String
    }

    input LoginInput{
        username: String!
        password: String!
        longitude: Float!
        latitude: Float!
        distance: Int!
    }

    type LoginResponse{
        user: User
        friends: [Friend]
    }

    type LocationBlog{
        _id: ID!
        info: String!
        img: String
        pos: Position
        author: ID!
        likedBy: [ID]
        likedByCount: Int
        created: String
        lastUpdated: String
    }

    type Position{
        longitude: Float!
        latitude: Float!
    }

    type Friend{
        username: String!
        latitude: Float!
        longitude: Float!
    }

    type Query{
        getUserById(id: ID!): User
        getUserByUsername(username: String!): User
        getAllUsers: [User]
        login(input: LoginInput): LoginResponse
        getAllBlogs: [LocationBlog]
        getBlogByID(id: ID!): LocationBlog
        getBlogsByAuthor(authorId: ID!): [LocationBlog]
    }
    `);

const root = {
	getUserById: function({ id }) {
		return userFacade.findById(id);
	},
	getUserByUsername: function({ username }) {
		return userFacade.findByUsername(username);
	},
	getAllUsers: function() {
		return userFacade.getAllUsers();
	},
	login: function({ input }) {
		return loginFacade.login(input).then((data) => {
			console.log(data);
			return data;
		});
	},
	getAllBlogs: function() {
		return blogFacade.getAllBlogs();
	},
	getBlogByID: function({ id }) {
		return blogFacade.findById(id);
	},
	getBlogsByAuthor: function({ authorId }) {
		return blogFacade.findByAuthorId(authorId);
	}
};

module.exports = graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
});
