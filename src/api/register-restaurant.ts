import { api } from "@/lib/axios";

// tipa o tipo de entrada na requisiçao
export interface RegisterRestaurantBody {
    restaurantName: string
    managerName: string
    email: string
    phone: string
}

export async function registerRestaurant({
    restaurantName,
    managerName,
    email,
    phone
}: RegisterRestaurantBody) {
    await api.post('/restaurants', {
        restaurantName,
        managerName,
        email,
        phone
    })
}