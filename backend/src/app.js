import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import blogRoutes from './routes/blog.js'
import appointmentRoutes from './routes/appointments.js'
import paymentRoutes from './routes/payments.js'
import documentRoutes from './routes/documents.js'
import adminRoutes from './routes/admin.js'
import { notFound, errorHandler } from './middleware/errors.js'

const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/payments', paymentRoutes)
// Stripe webhook needs raw body parsing; this example assumes it's handled within route
app.use('/api/documents', documentRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
