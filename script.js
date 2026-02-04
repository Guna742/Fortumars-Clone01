// Dashboard JavaScript - Human-written code for UI interactions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDropdown();
    initializeProgressBars();
    initializeAnimations();
    initializeModals();
    initializeActionButtons();
});

/**
 * Initialize tab navigation system
 * Handles switching between different sections of the dashboard
 */
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Re-animate progress bars when switching tabs
                animateProgressBars();
            }
        });
    });
}

/**
 * Initialize user profile dropdown
 * Shows/hides dropdown menu when clicking profile
 */
function initializeDropdown() {
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (userProfile && profileDropdown) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userProfile.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
        
        // Close dropdown when clicking a menu item
        const dropdownItems = profileDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                profileDropdown.classList.remove('show');
                console.log('Clicked:', this.textContent);
            });
        });
    }
}

/**
 * Initialize and animate all progress bars on the page
 * Uses data-progress attribute to set width
 */
function initializeProgressBars() {
    setTimeout(() => {
        animateProgressBars();
    }, 300);
}

/**
 * Animate progress bars to their target values
 * Called on page load and when switching tabs
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const targetProgress = bar.getAttribute('data-progress');
        
        if (targetProgress) {
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetProgress + '%';
            }, 100);
        }
    });
}

/**
 * Initialize additional UI animations
 * Adds hover effects and interactive elements
 */
function initializeAnimations() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Animate metric cards on hover
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.nav-tab');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Notification badge interaction
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            const badge = this.querySelector('.notification-badge');
            if (badge) {
                badge.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    badge.style.animation = '';
                }, 300);
            }
        });
    }
    
    // Table row hover effect
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            this.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });
    
    // Course card click handler
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Course clicked:', this.querySelector('h4').textContent);
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Initialize modal functionality
 * Handles opening and closing modals
 */
function initializeModals() {
    const leaveModal = document.getElementById('leaveModal');
    const closeLeaveModal = document.getElementById('closeLeaveModal');
    const cancelLeave = document.getElementById('cancelLeave');
    
    // Close modal when clicking X or Cancel
    if (closeLeaveModal) {
        closeLeaveModal.addEventListener('click', function() {
            leaveModal.classList.remove('show');
        });
    }
    
    if (cancelLeave) {
        cancelLeave.addEventListener('click', function() {
            leaveModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (leaveModal) {
        leaveModal.addEventListener('click', function(e) {
            if (e.target === leaveModal) {
                leaveModal.classList.remove('show');
            }
        });
    }
    
    // Handle form submission
    const leaveForm = document.querySelector('.leave-form');
    if (leaveForm) {
        leaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Leave request submitted');
            // Show success message (in a real app)
            alert('Leave request submitted successfully!');
            leaveModal.classList.remove('show');
            leaveForm.reset();
        });
    }
}

/**
 * Initialize action buttons functionality
 * Handles all quick action buttons
 */
function initializeActionButtons() {
    // Leave request button
    const btnLeaveRequest = document.getElementById('btnLeaveRequest');
    if (btnLeaveRequest) {
        btnLeaveRequest.addEventListener('click', function() {
            const leaveModal = document.getElementById('leaveModal');
            leaveModal.classList.add('show');
        });
    }
    
    // Attendance button
    const btnAttendance = document.getElementById('btnAttendance');
    if (btnAttendance) {
        btnAttendance.addEventListener('click', function() {
            console.log('Mark Attendance clicked');
            alert('Attendance marked for today!');
        });
    }
    
    // Payslip button
    const btnPayslip = document.getElementById('btnPayslip');
    if (btnPayslip) {
        btnPayslip.addEventListener('click', function() {
            console.log('View Payslip clicked');
            alert('Opening latest payslip...');
        });
    }
    
    // Reimbursement button
    const btnReimbursement = document.getElementById('btnReimbursement');
    if (btnReimbursement) {
        btnReimbursement.addEventListener('click', function() {
            console.log('Request Reimbursement clicked');
            alert('Reimbursement request form opened');
        });
    }
    
    // LMS action buttons
    const btnEnrollCourse = document.getElementById('btnEnrollCourse');
    if (btnEnrollCourse) {
        btnEnrollCourse.addEventListener('click', function() {
            console.log('Enroll in Course clicked');
            alert('Browse available courses...');
        });
    }
    
    const btnMyCourses = document.getElementById('btnMyCourses');
    if (btnMyCourses) {
        btnMyCourses.addEventListener('click', function() {
            console.log('My Learning Path clicked');
            alert('Viewing your learning path...');
        });
    }
    
    const btnCertificates = document.getElementById('btnCertificates');
    if (btnCertificates) {
        btnCertificates.addEventListener('click', function() {
            console.log('My Certificates clicked');
            alert('Viewing your certificates...');
        });
    }
    
    const btnScheduleTraining = document.getElementById('btnScheduleTraining');
    if (btnScheduleTraining) {
        btnScheduleTraining.addEventListener('click', function() {
            console.log('Schedule Training clicked');
            alert('Opening training scheduler...');
        });
    }
    
    // Approve/Reject buttons
    const approveButtons = document.querySelectorAll('.btn-approve');
    approveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Leave approved');
            alert('Leave request approved!');
        });
    });
    
    const rejectButtons = document.querySelectorAll('.btn-reject');
    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Leave rejected');
            alert('Leave request rejected!');
        });
    });
    
    // Course continue buttons
    const continueButtons = document.querySelectorAll('.btn-continue');
    continueButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseName = this.parentElement.querySelector('h4').textContent;
            console.log('Continue course:', courseName);
            alert('Resuming course: ' + courseName);
        });
    });
    
    // Enroll buttons
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    enrollButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseName = this.closest('.course-card').querySelector('h4').textContent;
            console.log('Enroll in:', courseName);
            alert('Enrolling in: ' + courseName);
        });
    });
    
    // Join session buttons
    const joinButtons = document.querySelectorAll('.btn-join');
    joinButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sessionName = this.parentElement.querySelector('h4').textContent;
            console.log('Join session:', sessionName);
            alert('Joining session: ' + sessionName);
        });
    });
}

/**
 * Helper function to simulate data loading
 */
function simulateDataLoad() {
    console.log('Dashboard loaded successfully');
    console.log('Active user:', 'Aditya Kumar');
    console.log('Current tab:', document.querySelector('.nav-tab.active').textContent);
}

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('Fortumars AI Technologies Dashboard initialized');
simulateDataLoad();