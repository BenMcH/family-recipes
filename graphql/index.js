const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
    type Ingredient {
        name: String!
        quantity: String!
    }

    type Recipe {
        id: ID!
        name: String!
        coverPhotoUrl: String
        description: String!
        ingredients: [Ingredient!]
        instructions: [String!]
    }

    type Query {
        recipes: [Recipe!]
    }
`;

const recipes = [
    {
        id: 'e949e7be-acb3-47a6-8f17-a53fcf447d82',
        name: 'Cereal',
        description: 'Yep, it\'s cereal',
        ingredients: [
            {
                name: 'Milk',
                quantity: '1 cup'
            },
            {
                name: 'Cereal',
                quantity: '1 handful'
            }
        ],
        instructions: [
            'Pour the cereal into the bowl',
            'Pour the milk over the cereal',
            'Eat',
            'Pour more cereal over the leftover milk'
        ]
    },
    {
        id: 'd4043f80-e2dd-4ad6-b3b4-83c1134203f1',
        name: 'PB&J',
        description: 'Ah, my favorite snack to either enjoy or die from. Thanks peanuts',
        ingredients: [
            {
                name: 'Peanut Butter',
                quantity: '1 dollop'
            },
            {
                name: 'Jelly',
                quantity: '2 Dollops'
            },
            {
                name: 'Bread',
                quantity: '1-2 slices'
            }
        ],
        instructions: [
            'Spread peanut butter on a piece of bread',
            'Spread jelly on the other',
            'Combine',
            'Eat'
        ]
    }
]

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    recipes: () => recipes,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});