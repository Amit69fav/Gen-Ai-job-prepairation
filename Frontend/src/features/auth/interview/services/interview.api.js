import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/interview`,
    withCredentials: true,
});

export async function generateInterviewReport({ resume, jobDescription, selfDescription }) {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);

    const response = await api.post('/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export async function generateInterviewSection({ section, jobDescription, selfDescription }) {
    const response = await api.post('/more', {
        section,
        jobDescription,
        selfDescription
    });

    return response.data;
}

export async function generateRoadmapForDays({ days, jobDescription, selfDescription }) {
    const response = await api.post('/roadmap', {
        days,
        jobDescription,
        selfDescription
    });

    return response.data;
}

export async function generateATSResume({ resume, jobDescription, selfDescription }) {
    const formData = new FormData();
    if (resume) formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);

    const response = await api.post('/ats-resume', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.atsResume;
}
