import axios from 'axios';

// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://mentors.hackupc.com';

const login = (email, password, onResponse, onError) => {
    console.log('log in');
    axios.post(baseUrl + '/api/sign_in',
    {
        "email": email,
        "password": password
    })
    .then(function (response) {
        onResponse(response);
    })
    .catch(function (error) {
        onError(error);
    });
}

const register = (email, name, password, contact, onResponse, onError) => {
    axios.post(baseUrl + '/api/sign_up',
    {
        "email": email,
        "name": name,
        "contact": contact,
        "password": password
    })
    .then(function (response) {
        onResponse(response);
    })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        onError(error);
    });
}

const registerMentor = (email, name, password, contact, code, onResponse, onError) => {
    axios.post(baseUrl + '/api/mentors/sign_up',
    {
        "email": email,
        "name": name,
        "contact": contact,
        "password": password
    })
    .then(function (response) {
        onResponse(response);
    })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        onError(error);
    });
}

const createTicket = (title, topic, comments, location, contact, token, onResponse, onError) => {
    axios({ method: 'POST', url: baseUrl + '/api/v1/tickets', headers: {Authorization: token}, data: 
        {
            "ticket": {
                "name":title,
                "imageUrl":"....",
                "topic":topic,
                "contact": contact,
                "location": location,
                "status":1, 
                "comments": comments
            }	
        }
    }).then(function (response) {
        console.log(response);
        onResponse(response);
    }).catch(function (error) {
        console.log(error);
        onError(error)
    });
}

const getUsers = (onResponse, onError, token) => {
    axios({ method: 'GET', url: baseUrl + '/api/v1/users', headers: {Authorization: token}, data: {}
    }).then(function (response) {
        console.log(response);
        onResponse(response.data.data);
    }).catch(function (error) {
        console.log(error);
        onError()
    });
}

const inviteUser = (userEmail, token, onResponse, onError) => {
    axios({ method: 'POST', url: baseUrl + '/api/v1/invitation-code', headers: {Authorization: token}, data: {inv_email: userEmail}
    }).then(function (response) {
        console.log(response);
        onResponse(response.data);
    }).catch(function (error) {
        console.log(error);
        onError()
    });
}

const loadTickets = (callback, token) => {
    console.log('getting tickets');
    axios({ method: 'GET', url: baseUrl + '/api/v1/tickets', headers: {Authorization: token}, data: {}
    }).then(function (response) {
        console.log(response);
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}

const claimTicket = (ticket, token, user_id, onResponse, onError) => {
    axios({ method: 'PUT', url: baseUrl + '/api/v1/tickets/' + ticket.id, headers: {Authorization: token}, data: {ticket: {id: ticket.id, claimer_id: user_id}}
    }).then(function (response) {
        onResponse(response.data.data);
    }).catch(function (error) {
        onError(error)
    });
}

const updateTicket = (ticket, token, user_id, onResponse, onError) => {
    axios({ method: 'PUT', url: baseUrl + '/api/v1/tickets/' + ticket.id, headers: {Authorization: token}, data: {ticket: {id: ticket.id, claimer_id: user_id}}
    }).then(function (response) {
        onResponse(response.data.data);
    }).catch(function (error) {
        onError(error)
    });
}

const deleteTicket = (ticket, token, onResponse, onError) => {
    axios({ method: 'DELETE', url: baseUrl + '/api/v1/tickets/' + ticket.id, headers: {Authorization: token}, data: {}
    }).then(function (response) {
        onResponse(response.data.data);
    }).catch(function (error) {
        onError(error)
    });
}

export { login, createTicket , loadTickets, register, getUsers, inviteUser, claimTicket, registerMentor };