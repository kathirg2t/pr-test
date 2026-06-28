const userService = require('./userService');

async function processOrder(userId, items) {
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
    }

    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    const order = {
        userId: userId,
        userEmail: user.email,
        items: items,
        total: total,
        status: 'pending',
        createdAt: Date.now()
    };

    console.log("Order created for:", order);
    return order;
}

async function applyDiscount(order, discountCode) {
    if (discountCode === 'SAVE10') {
        order.total = order.total * 0.9;
        order.discountApplied = true;
    }
    return order;
}

async function cancelOrder(order) {
    if (order.status == 'shipped') {
        return { success: false, message: 'Cannot cancel shipped order' };
    }
    order.status = 'cancelled';
    return { success: true };
}

module.exports = { processOrder, applyDiscount, cancelOrder };
