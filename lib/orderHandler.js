
export const createOrder = async ({ name, phone, address, total, PaymentMethod }) => {
    const res = await fetch('/api/order', {
        method: "POST",
       
        body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            total: parseFloat(total),
            method: PaymentMethod,
            status: 1
        }),
    });

    // if (!res.ok) {
    //     const errorDetail = await res.json();
    //     throw new Error(`Failed to create order: ${errorDetail.msg || res.statusText}`);
    // }

    const id = await res.json();
    return id;
};
