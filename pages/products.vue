<template>
    <div>
        <nord-notification-group>
            <nord-notification v-if="showNotification">
                <p>{{ notificationMessage }}</p>
            </nord-notification>
        </nord-notification-group>

        <nord-card>
            <h2 slot="header">Products Page</h2>
            <nord-table>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th class="n-table-align-right">Price</th>
                            <th class="n-table-align-right">Updates & Announcements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.title }}</td>
                            <td class="n-table-ellipsis">{{ product.description }}</td>
                            <td class="n-table-ellipsis">{{ product.category }}</td>
                            <td class="n-table-align-right">{{ product.price }}&thinsp;€</td>
                            <td class="n-table-align-right">
                                <nord-checkbox v-model="subscriptions[product.id]" @change="toggleSubscribe(product)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </nord-table>
        </nord-card>
    </div>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useProductsStore } from '~/store/products';

    const { getAllProducts } = useProductsStore();
    const { products } = storeToRefs(useProductsStore());

    // Reactive object to track subscription status for each product by its ID
    const subscriptions = ref({});
    const showNotification = ref(false);
    const notificationMessage = ref("");

    // Watch each subscription change
    const toggleSubscribe = product => {
        let msg = ''
        subscriptions.value[product.id] = !subscriptions.value[product.id];

        if (subscriptions.value[product.id]) {
            msg = `You are successfully subscribed to updates for ${product.title}.`;
            showNotificationPopup (msg)
        } else {
            msg = `You have unsubscribed from updates for ${product.title}.`;
            showNotificationPopup (msg)
        }
    };

    // Initialize subscription status for each product
    getAllProducts().then(() => {
        products.value.forEach(product => {
            subscriptions.value[product.id] = false;
        });
    });
    
    // Show notifications popup with msg.
    const showNotificationPopup = msg => {
        notificationMessage.value = msg;
        showNotification.value = true;

        setTimeout(() => { showNotification.value = false }, 2000);
    }
</script>
