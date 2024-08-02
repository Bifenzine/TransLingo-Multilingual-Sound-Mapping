export const handleDelete = async (id) => {
    // Display confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this word?");

    // If user confirms deletion, proceed with delete request
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:7000/deleteWord/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Deletion successful, do something
                console.log('Word deleted successfully');
                // Optionally, you can update your state or UI here after successful deletion
            } else {
                // Deletion failed, handle error
                console.error('Word deletion failed');
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        // User canceled deletion, do nothing
        console.log('Deletion canceled by user');
    }
};