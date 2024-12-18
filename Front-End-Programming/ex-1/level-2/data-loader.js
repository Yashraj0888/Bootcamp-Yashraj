// Data Loader Module
export async function loadStudentData() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading student data:', error);
        return [];
    }
}