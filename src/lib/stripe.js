import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TiSzWH3MWkBoN0S5oFJtQAf',
    'seeker_premium': 'price_1TiVsRH3MWkBoN0SZ9Ve5yOR',
    'recruiter_growth':'price_1TiVuSH3MWkBoN0SErEhQNj8',
    'recruiter_enterprice':'price_1TiVvmH3MWkBoN0Skbz6VfqT'
}