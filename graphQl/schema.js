const typeDefs = `
    type User {
        firstName: String,
		lastName: String,
		username: String,
		password: String,
        email: String,
        job: [Job],
        created: Date,
        lastUpdated: Date
    }

    type Job {
        type: String,
        company: String,
        companyUrl: String
    }

    type Position {
        user: User,
        created: Date,
        loc: Loc
    }

    type Loc {
        type: String,
        coordinates: [Number]
    }

    type LocationBlog {
        info: String,
        img: String,
        pos: Pos,
        author: User,
        likedBy: [User],
        created: Date,
        lastUpdated: Date
    }

    type Pos {
        longitude: Number,
        latitude: Number
    }
`;
