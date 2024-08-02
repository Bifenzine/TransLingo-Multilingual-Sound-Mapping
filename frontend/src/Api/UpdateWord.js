export const handleEdit = async (id, formData) => {
    try {
        const response = await fetch(`http://localhost:7000/editWord/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Edit successful, do something
            console.log('Word edited successfully');
            return true;
        } else {
            // Edit failed, handle error
            console.error('Word edit failed');
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};