import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import cors from 'cors'

const app = express()
app.use(cors())

const schema = buildSchema(`
  type Question {
    id: ID
    title: String!
    type: String!
    options: [String]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionIndex: Int
    value: String
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer]
  }

  input QuestionInput {
    title: String!
    type: String!
    options: [String]
  }

  input AnswerInput {
    questionIndex: Int
    value: String
    values: [String]
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(
      title: String!
      description: String
      questions: [QuestionInput]
    ): Form

    submitResponse(
      formId: ID!
      answers: [AnswerInput]
    ): Response
  }
`)

let forms = []

let responses = []

const root = {
	forms: () => forms,

	form: ({ id }) => forms.find((item) => item.id === id),

	responses: ({ formId }) => responses.filter((r) => r.formId === formId),

	createForm: ({ title, description, questions }) => {
		const newForm = {
			id: Date.now().toString(),
			title,
			description,
			questions: questions || []
		}

		forms.push(newForm)
		return newForm
	},

	submitResponse: ({ formId, answers }) => {
		const normalized = answers.map((a) => ({
			questionIndex: a.questionIndex,
			value: a.value || null,
			values: a.values || null
		}))

		const response = {
			id: Date.now().toString(),
			formId,
			answers: normalized
		}

		responses.push(response)
		return response
	}
}

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	})
)

app.listen(7777, () => {
	console.log('Server is running')
})
