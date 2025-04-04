  // DOM Elements
  const notificationBar = document.getElementById('notificationBar');
  const notificationText = document.getElementById('notificationText');
  const notificationClose = document.getElementById('notificationClose');
  const homeLink = document.getElementById('homeLink');
  const eventsLink = document.getElementById('eventsLink');
  const adminLink = document.getElementById('adminLink');
  const homePage = document.getElementById('homePage');
  const eventsPage = document.getElementById('eventsPage');
  const adminDashboard = document.getElementById('adminDashboard');
  const authButtons = document.getElementById('authButtons');
  const userInfo = document.getElementById('userInfo');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const loginBtnNav = document.getElementById('loginBtnNav');
  const signupBtnNav = document.getElementById('signupBtnNav');
  const logoutBtn = document.getElementById('logoutBtn');
  const homeEventsGrid = document.getElementById('homeEventsGrid');
  const eventsGrid = document.getElementById('eventsGrid');
  const searchEvent = document.getElementById('searchEvent');
  const filterCategory = document.getElementById('filterCategory');
  const totalEvents = document.getElementById('totalEvents');
  const upcomingEvents = document.getElementById('upcomingEvents');
  const totalRegistrations = document.getElementById('totalRegistrations');
  const activeUsers = document.getElementById('activeUsers');
  const eventName = document.getElementById('eventName');
  const eventDate = document.getElementById('eventDate');
  const eventCategory = document.getElementById('eventCategory');
  const eventDescription = document.getElementById('eventDescription');
  const addEventBtn = document.getElementById('addEventBtn');
  const adminEventsGrid = document.getElementById('adminEventsGrid');
  const eventPopup = document.getElementById('eventPopup');
  const popupClose = document.getElementById('popupClose');
  const popupImage = document.getElementById('popupImage');
  const popupTitle = document.getElementById('popupTitle');
  const popupDate = document.getElementById('popupDate');
  const popupCategory = document.getElementById('popupCategory');
  const popupRegistrations = document.getElementById('popupRegistrations');
  const popupDescription = document.getElementById('popupDescription');
  const popupRegCount = document.getElementById('popupRegCount');
  const popupRegNumber = document.getElementById('popupRegNumber');
  const popupRegisterBtn = document.getElementById('popupRegisterBtn');
  const loginModal = document.getElementById('loginModal');
  const loginClose = document.getElementById('loginClose');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginSubmit = document.getElementById('loginSubmit');
  const showSignup = document.getElementById('showSignup');
  const signupModal = document.getElementById('signupModal');
  const signupClose = document.getElementById('signupClose');
  const signupName = document.getElementById('signupName');
  const signupEmail = document.getElementById('signupEmail');
  const signupPassword = document.getElementById('signupPassword');
  const signupConfirm = document.getElementById('signupConfirm');
  const isAdminSignup = document.getElementById('isAdminSignup');
  const adminCodeGroup = document.getElementById('adminCodeGroup');
  const adminCode = document.getElementById('adminCode');
  const signupSubmit = document.getElementById('signupSubmit');
  const showLogin = document.getElementById('showLogin');

  
    // Initialize data
    if (!localStorage.getItem('events')) {
        const defaultEvents = [{
                id: 1,
                name: 'Welcome to Fusion Club!',
                date: '2023-11-15',
                category: 'Tech',
                description: 'Join us for our inaugural event and learn what Fusion Club is all about! Meet fellow members, learn about our upcoming activities, and enjoy some refreshments.',
                registrations: []
            },
            {
                id: 2,
                name: 'AI Workshop',
                date: '2023-11-22',
                category: 'Tech',
                description: 'Learn the basics of artificial intelligence and machine learning in this hands-on workshop. No prior experience required!',
                registrations: []
            },
            {
                id: 3,
                name: 'Game Design Challenge',
                date: '2023-11-29',
                category: 'Gaming',
                description: 'Design and prototype a game in just 48 hours! Work in teams or solo to create something amazing.',
                registrations: []
            }
        ];
        localStorage.setItem('events', JSON.stringify(defaultEvents));
    }

    if (!localStorage.getItem('users')) {
        const defaultUsers = [{
            id: 1,
            name: 'Admin User',
            email: 'admin@fusionclub.com',
            password: 'admin123', // In real app, this should be hashed
            isAdmin: true,
            registeredEvents: []
        }];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }

    if (!localStorage.getItem('adminCode')) {
        localStorage.setItem('adminCode', 'fusion2023'); // Simple admin code
    }

    // Check if user is logged in on page load
    document.addEventListener('DOMContentLoaded', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            updateAuthUI(currentUser);
            if (currentUser.isAdmin) {
                adminLink.classList.remove('hidden');
            }
        }

        // Show latest event notification
        const events = JSON.parse(localStorage.getItem('events'));
        if (events && events.length > 0) {
            const latestEvent = events.reduce((latest, event) => {
                return new Date(event.date) > new Date(latest.date) ? event : latest;
            }, events[0]);

            showNotification(`New event: ${latestEvent.name} on ${formatDate(latestEvent.date)}`);
        }

        // Load home page events
        loadHomeEvents();
    });

    // Event Listeners
    notificationClose.addEventListener('click', () => {
        notificationBar.classList.add('hidden');
    });

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    eventsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showEventsPage();
    });

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminDashboard();
    });

    loginBtnNav.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginModal();
    });

    signupBtnNav.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupModal();
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });

    
    searchEvent.addEventListener('input', filterEvents);
    filterCategory.addEventListener('change', filterEvents);
    addEventBtn.addEventListener('click', addNewEvent);
    popupClose.addEventListener('click', closeEventPopup);
    popupRegisterBtn.addEventListener('click', registerFromPopup);
    loginClose.addEventListener('click', closeLoginModal);
    loginSubmit.addEventListener('click', handleLogin);
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeLoginModal();
        showSignupModal();
    });
    signupClose.addEventListener('click', closeSignupModal);
    isAdminSignup.addEventListener('change', () => {
        adminCodeGroup.style.display = isAdminSignup.checked ? 'block' : 'none';
    });
    signupSubmit.addEventListener('click', handleSignup);
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeSignupModal();
        showLoginModal();
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === eventPopup) {
            closeEventPopup();
        }
        if (e.target === loginModal) {
            closeLoginModal();
        }
        if (e.target === signupModal) {
            closeSignupModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!eventPopup.classList.contains('invisible')) closeEventPopup();
            if (!loginModal.classList.contains('invisible')) closeLoginModal();
            if (!signupModal.classList.contains('invisible')) closeSignupModal();
        }
    });

    // Functions
    function updateAuthUI(user) {
        if (user) {
            authButtons.classList.add('hidden');
            userInfo.classList.remove('hidden');
            usernameDisplay.textContent = user.name;
        } else {
            authButtons.classList.remove('hidden');
            userInfo.classList.add('hidden');
        }
    }

    function showHomePage() {
        homePage.classList.remove('hidden');
        eventsPage.classList.add('hidden');
        adminDashboard.classList.add('hidden');
        loadHomeEvents();
    }

    function showEventsPage() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showLoginModal();
            return;
        }

        homePage.classList.add('hidden');
        eventsPage.classList.remove('hidden');
        adminDashboard.classList.add('hidden');
        loadEvents();
    }

    function showAdminDashboard() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.isAdmin) {
            alert('Only admins can access this page');
            return;
        }

        homePage.classList.add('hidden');
        eventsPage.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        loadAdminStats();
        loadAdminEvents();
    }

    function showNotification(message) {
        notificationText.textContent = message;
        notificationBar.classList.remove('hidden');
        setTimeout(() => {
            notificationBar.classList.add('hidden');
        }, 5000);
    }

    function loadHomeEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        // Show only 3 latest events on home page
        const latestEvents = [...events]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        homeEventsGrid.innerHTML = '';

        latestEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card bg-white/15 rounded-xl shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-lg cursor-pointer';
            eventCard.innerHTML = `
                <div class="event-image h-36 ${getCategoryColorClass(event.category)} flex items-center justify-center text-white text-xl font-bold">
                    ${event.category}
                </div>
                <div class="p-6">
                    <h3 class="font-semibold text-white text-2xl mb-2">${event.name}</h3>
                    <div class="text-zinc-200 text-sm mb-2">${formatDate(event.date)}</div>
                    <span class="inline-block bg-orange-500/30 text-white  px-2 py-0.5 rounded-full text-xs mb-4">${event.category}</span>
                    <p class="text-zinc-200 text-sm line-clamp-3">${event.description}</p>
                </div>
            `;

            eventCard.addEventListener('click', () => {
                openEventPopup(event);
            });

            homeEventsGrid.appendChild(eventCard);
        });
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        eventsGrid.innerHTML = '';

        if (events.length === 0) {
            eventsGrid.innerHTML = '<p class="col-span-full text-center py-8">No events found. Check back later!</p>';
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card bg-white/15 rounded-xl shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-lg cursor-pointer';
            eventCard.innerHTML = `
                <div class="event-image h-36 ${getCategoryColorClass(event.category)} flex items-center justify-center text-white text-xl font-bold">
                    ${event.category}
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-semibold text-white mb-2">${event.name}</h3>
                    <div class="text-zinc-200 text-sm mb-2">${formatDate(event.date)}</div>
                    <span class="inline-block bg-orange-500/30 text-white px-2 py-0.5 rounded-full text-xs mb-4">${event.category}</span>
                    <p class="text-zinc-200 text-sm line-clamp-3">${event.description}</p>
                </div>
            `;

            eventCard.addEventListener('click', () => {
                openEventPopup(event);
            });

            eventsGrid.appendChild(eventCard);
        });
    }

    function loadAdminStats() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Total events
        totalEvents.textContent = events.length;

        // Upcoming events (future dates)
        const upcoming = events.filter(event => new Date(event.date) >= new Date());
        upcomingEvents.textContent = upcoming.length;

        // Total registrations
        const totalRegs = events.reduce((sum, event) => sum + (event.registrations ? event.registrations.length : 0), 0);
        totalRegistrations.textContent = totalRegs;

        // Active users (users with at least one registration)
        const active = users.filter(user => {
            return events.some(event =>
                event.registrations && event.registrations.includes(user.id)
            );
        }).length;
        activeUsers.textContent = active;
    }

    function loadAdminEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];

        adminEventsGrid.innerHTML = '';

        if (events.length === 0) {
            adminEventsGrid.innerHTML = '<p class="col-span-full text-center py-8">No events found. Add your first event!</p>';
            return;
        }

        events.forEach(event => {
            const registeredUsers = event.registrations ?
                event.registrations.map(regId => {
                    const user = users.find(u => u.id === regId);
                    return user ? user.name : 'Unknown';
                }) : [];

            const eventCard = document.createElement('div');
            eventCard.className = 'bg-white/15 rounded-xl shadow-md overflow-hidden';
            eventCard.innerHTML = `
                <div class="event-image h-36 ${getCategoryColorClass(event.category)} flex items-center justify-center text-white text-xl font-bold">
                    ${event.category}
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-semibold text-white mb-2">${event.name}</h3>
                    <div class="text-zinc-200 text-sm mb-2">${formatDate(event.date)}</div>
                    <span class="inline-block bg-orange-500/15 text-white px-2 py-0.5 rounded-full text-xs mb-4">${event.category}</span>
                    <div class="text-zinc-200 text-sm mb-4">${event.description}</div>
                    <div class="mt-4">
                        <strong class="text-zinc-200">Registrations (${registeredUsers.length}):</strong>
                        ${registeredUsers.length > 0 ? 
                            `<ul class="mt-2 pl-5 space-y-1">
                                ${registeredUsers.map(user => `<li class="text-zinc-600">${user}</li>`).join('')}
                            </ul>` : 
                            '<p class="text-zinc-500 mt-2">No registrations yet</p>'}
                    </div>
                    <button class="w-full mt-4 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:opacity-90 transition" data-id="${event.id}">
                        Delete Event
                    </button>
                </div>
            `;

            adminEventsGrid.appendChild(eventCard);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('[data-id]').forEach(btn => {
            btn.addEventListener('click', deleteEvent);
        });
    }

    
    function filterEvents() {
        const searchTerm = searchEvent.value.toLowerCase();
        const category = filterCategory.value;
        const events = JSON.parse(localStorage.getItem('events')) || [];

        const filteredEvents = events.filter(event => {
            const matchesSearch = event.name.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || event.category === category;
            return matchesSearch && matchesCategory;
        });

        eventsGrid.innerHTML = '';

        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = '<p class="col-span-full text-center py-8">No events found matching your criteria.</p>';
            return;
        }

        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card bg-white/15 rounded-xl shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-lg cursor-pointer';
            eventCard.innerHTML = `
                <div class="event-image h-36 ${getCategoryColorClass(event.category)} flex items-center  justify-center text-white text-xl font-bold">
                    ${event.category}
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-white mb-2">${event.name}</h3>
                    <div class="text-zinc-200 text-sm mb-2">${formatDate(event.date)}</div>
                    <span class="inline-block bg-orange-500/40 text-white px-2 py-0.5 rounded-full text-xs mb-4">${event.category}</span>
                    <p class="text-zinc-200 text-sm line-clamp-3">${event.description}</p>
                </div>
            `;

            eventCard.addEventListener('click', () => {
                openEventPopup(event);
            });

            eventsGrid.appendChild(eventCard);
        });
    }

    function openEventPopup(event) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (!currentUser) {
            showLoginModal();
            return;
        }

        const isRegistered = event.registrations && event.registrations.includes(currentUser.id);
        const registeredUsers = event.registrations ?
            event.registrations.map(regId => {
                const user = users.find(u => u.id === regId);
                return user ? user.name : 'Unknown';
            }) : [];

        popupImage.className = `h-48 ${getCategoryColorClass(event.category)} rounded-xl mb-6 flex items-center justify-center text-white text-2xl font-bold`;
        popupImage.textContent = event.category;
        popupTitle.textContent = event.name;
        popupDate.textContent = formatDate(event.date);
        popupCategory.textContent = event.category;
        popupRegistrations.textContent = event.registrations ? event.registrations.length : 0;
        popupDescription.textContent = event.description;
        popupRegNumber.textContent = event.registrations ? event.registrations.length : 0;

        
        if (isRegistered) {
            popupRegisterBtn.textContent = 'Registered!';
            popupRegisterBtn.classList.add('bg-zinc-300', 'text-zinc-700');
            popupRegisterBtn.classList.remove('bg-gradient-orange');
            popupRegisterBtn.disabled = true;
        } else {
            popupRegisterBtn.textContent = 'Register';
            popupRegisterBtn.classList.remove('bg-zinc-300', 'text-zinc-700');
            popupRegisterBtn.classList.add('bg-gradient-orange');
            popupRegisterBtn.disabled = false;
        }

        popupRegisterBtn.dataset.id = event.id;
        eventPopup.classList.remove('invisible', 'opacity-0');
        eventPopup.classList.add('visible', 'opacity-100');
        eventPopup.querySelector('div').classList.remove('translate-y-5');
    }

    
    function closeEventPopup() {
        eventPopup.classList.add('invisible', 'opacity-0');
        eventPopup.classList.remove('visible', 'opacity-100');
        eventPopup.querySelector('div').classList.add('translate-y-5');
    }

    function registerFromPopup() {
        const eventId = parseInt(popupRegisterBtn.dataset.id);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            showLoginModal();
            return;
        }

        const events = JSON.parse(localStorage.getItem('events'));
        const eventIndex = events.findIndex(event => event.id === eventId);

        if (eventIndex === -1) return;

        if (!events[eventIndex].registrations) {
            events[eventIndex].registrations = [];
        }

        if (events[eventIndex].registrations.includes(currentUser.id)) {
            // Already registered
            return;
        }

        events[eventIndex].registrations.push(currentUser.id);
        localStorage.setItem('events', JSON.stringify(events));

        // Update user's registered events
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.id === currentUser.id);

        if (userIndex !== -1) {
            if (!users[userIndex].registeredEvents) {
                users[userIndex].registeredEvents = [];
            }
            users[userIndex].registeredEvents.push(eventId);
            localStorage.setItem('users', JSON.stringify(users));

            // Update current user data
            currentUser.registeredEvents = users[userIndex].registeredEvents;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        popupRegisterBtn.textContent = 'Registered!';
        popupRegisterBtn.classList.add('bg-zinc-300', 'text-zinc-700');
        popupRegisterBtn.classList.remove('bg-gradient-orange');
        popupRegisterBtn.disabled = true;

        // Update registrations count
        const regCount = events[eventIndex].registrations.length;
        popupRegistrations.textContent = regCount;
        popupRegNumber.textContent = regCount;

        // Reload events if on admin dashboard
        if (!adminDashboard.classList.contains('hidden')) {
            loadAdminStats();
            loadAdminEvents();
        }
    }

    function addNewEvent() {
        const name = eventName.value.trim();
        const date = eventDate.value;
        const category = eventCategory.value;
        const description = eventDescription.value.trim();

        if (!name || !date || !description) {
            alert('Please fill all fields');
            return;
        }

        const events = JSON.parse(localStorage.getItem('events')) || [];
        const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;

        const newEvent = {
            id: newId,
            name,
            date,
            category,
            description,
            registrations: []
        };

        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // Clear form
        eventName.value = '';
        eventDate.value = '';
        eventDescription.value = '';

        // Show notification
        showNotification(`New event added: ${name} on ${formatDate(date)}`);

        // Reload admin events and stats
        loadAdminStats();
        loadAdminEvents();

        // Update home page events
        loadHomeEvents();
    }

    
    function deleteEvent(e) {
        if (!confirm('Are you sure you want to delete this event? All registrations will be lost.')) return;

        const eventId = parseInt(e.target.dataset.id);
        let events = JSON.parse(localStorage.getItem('events')) || [];

        events = events.filter(event => event.id !== eventId);
        localStorage.setItem('events', JSON.stringify(events));

        // Update users' registered events
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            if (user.registeredEvents) {
                user.registeredEvents = user.registeredEvents.filter(id => id !== eventId);
            }
        });
        localStorage.setItem('users', JSON.stringify(users));

        // Update current user if logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.registeredEvents) {
            currentUser.registeredEvents = currentUser.registeredEvents.filter(id => id !== eventId);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        loadAdminStats();
        loadAdminEvents();
    }

    function showLoginModal() {
        loginModal.classList.remove('invisible', 'opacity-0');
        loginModal.classList.add('visible', 'opacity-100');
        loginModal.querySelector('div').classList.remove('translate-y-5');
    }

    function closeLoginModal() {
        loginModal.classList.add('invisible', 'opacity-0');
        loginModal.classList.remove('visible', 'opacity-100');
        loginModal.querySelector('div').classList.add('translate-y-5');
    }

    function showSignupModal() {
        signupModal.classList.remove('invisible', 'opacity-0');
        signupModal.classList.add('visible', 'opacity-100');
        signupModal.querySelector('div').classList.remove('translate-y-5');
    }

    function closeSignupModal() {
        signupModal.classList.add('invisible', 'opacity-0');
        signupModal.classList.remove('visible', 'opacity-100');
        signupModal.querySelector('div').classList.add('translate-y-5');
    }

    function handleLogin() {
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (!email || !password) {
            alert('Please fill all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Invalid email or password');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI(user);
        closeLoginModal();

        if (user.isAdmin) {
            adminLink.classList.remove('hidden');
            showAdminDashboard();
        } else {
            showEventsPage();
        }
    }

    function handleSignup() {
        const name = signupName.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value.trim();
        const confirm = signupConfirm.value.trim();
        const isAdmin = isAdminSignup.checked;
        const code = adminCode.value.trim();

        if (!name || !email || !password || !confirm) {
            alert('Please fill all fields');
            return;
        }

        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }

        if (isAdmin && code !== localStorage.getItem('adminCode')) {
            alert('Invalid admin code');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

        const newUser = {
            id: newId,
            name,
            email,
            password, // In real app, this should be hashed
            isAdmin,
            registeredEvents: []
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Log in the new user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        updateAuthUI(newUser);
        closeSignupModal();

        // Clear form
        signupName.value = '';
        signupEmail.value = '';
        signupPassword.value = '';
        signupConfirm.value = '';
        isAdminSignup.checked = false;
        adminCodeGroup.style.display = 'none';
        adminCode.value = '';

        if (newUser.isAdmin) {
            adminLink.classList.remove('hidden');
            showAdminDashboard();
        } else {
            showEventsPage();
        }
    }

    function handleLogout() {
        localStorage.setItem('currentUser', JSON.stringify(null));
        updateAuthUI(null);
        adminLink.classList.add('hidden');
        showHomePage();
    }

    function formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function getCategoryColorClass(category) {
        const colors = {
            'Tech': 'bg-gradient-to-b from-orange-900 to-black',
            'Design': 'bg-gradient-to-b from-orange-900 to-black',
            'Gaming': 'bg-gradient-to-b from-orange-900 to-black',
            'Workshop': 'bg-gradient-to-b from-orange-900 to-black'
        };

        return colors[category] || 'bg-gradient-orange';
    }

    document.getElementById("menuToggle").addEventListener("click", function() {
        const navMenu = document.getElementById("navMenu");
        navMenu.classList.toggle("hidden");
        navMenu.classList.toggle("flex");
        navMenu.classList.toggle("flex-col");
        navMenu.classList.toggle("absolute");
        navMenu.classList.toggle("top-16");
        navMenu.classList.toggle("left-0");
        navMenu.classList.toggle("bg-orange-950");
        navMenu.classList.toggle("w-full");
        navMenu.classList.toggle("p-4");
    });