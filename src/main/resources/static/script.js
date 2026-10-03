// =====================================================
// DASHBOARD
// =====================================================

async function loadDashboard() {

    try {

        // TENANTS
        const tenantResponse =
            await fetch("/api/tenants");

        const tenants =
            await tenantResponse.json();

        document.getElementById("tenantCount")
            .textContent = tenants.length;


        // ROOMS
        const roomResponse =
            await fetch("/api/rooms");

        const rooms =
            await roomResponse.json();

        document.getElementById("roomCount")
            .textContent = rooms.length;


        // PAYMENTS
        const paymentResponse =
            await fetch("/api/payments");

        const payments =
            await paymentResponse.json();

        document.getElementById("paymentCount")
            .textContent = payments.length;


        // COMPLAINTS
        const complaintResponse =
            await fetch("/api/complaints");

        const complaints =
            await complaintResponse.json();

        document.getElementById("complaintCount")
            .textContent = complaints.length;


    } catch (error) {

        console.error(
            "Error loading dashboard:",
            error
        );

    }

}



// =====================================================
// TENANT FORM
// =====================================================

function showTenantForm() {

    document.getElementById("tenantForm")
        .style.display = "block";

}


function hideTenantForm() {

    document.getElementById("tenantForm")
        .style.display = "none";

    resetTenantForm();

}



// =====================================================
// RESET TENANT FORM
// =====================================================

function resetTenantForm() {

    document.getElementById("tenantName").value = "";

    document.getElementById("tenantPhone").value = "";

    document.getElementById("tenantEmail").value = "";

    document.getElementById("tenantGender").value = "";

    document.getElementById("tenantAddress").value = "";


    document.getElementById("tenantFormTitle")
        .textContent = "Add New Tenant";


    document.getElementById("tenantSaveButton")
        .textContent = "Save Tenant";


    document.getElementById("tenantSaveButton")
        .onclick = function () {

            addTenant();

        };

}



// =====================================================
// ADD TENANT
// =====================================================

async function addTenant() {

    const tenant = {

        name:
            document.getElementById("tenantName").value,

        phone:
            document.getElementById("tenantPhone").value,

        email:
            document.getElementById("tenantEmail").value,

        gender:
            document.getElementById("tenantGender").value,

        address:
            document.getElementById("tenantAddress").value

    };


    try {

        const response =
            await fetch("/api/tenants", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(tenant)

            });


        if (response.ok) {

            alert(
                "Tenant added successfully!"
            );

            hideTenantForm();

            loadDashboard();

            loadTenants();


        } else {

            alert(
                "Failed to add tenant."
            );

        }


    } catch (error) {

        console.error(
            "Error adding tenant:",
            error
        );

        alert(
            "Something went wrong."
        );

    }

}



// =====================================================
// LOAD TENANTS
// =====================================================

async function loadTenants() {

    try {

        const response =
            await fetch("/api/tenants");

        const tenants =
            await response.json();


        const tableBody =
            document.getElementById(
                "tenantTableBody"
            );


        tableBody.innerHTML = "";


        tenants.forEach(tenant => {

            const row = `

                <tr>

                    <td>
                        ${tenant.tenantId}
                    </td>

                    <td>
                        ${tenant.name}
                    </td>

                    <td>
                        ${tenant.phone}
                    </td>

                    <td>
                        ${tenant.email}
                    </td>

                    <td>
                        ${tenant.gender}
                    </td>

                    <td>
                        ${tenant.address}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editTenant(${tenant.tenantId})">

                            Edit

                        </button>


                        <button
                            class="btn btn-danger btn-sm ms-1"
                            onclick="deleteTenant(${tenant.tenantId})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;


            tableBody.innerHTML += row;

        });


    } catch (error) {

        console.error(
            "Error loading tenants:",
            error
        );

    }

}



// =====================================================
// EDIT TENANT
// =====================================================

async function editTenant(id) {

    try {

        const response =
            await fetch("/api/tenants");

        const tenants =
            await response.json();


        const tenant =
            tenants.find(
                tenant =>
                    tenant.tenantId === id
            );


        if (!tenant) {

            alert(
                "Tenant not found."
            );

            return;

        }


        // Fill form

        document.getElementById("tenantName")
            .value = tenant.name;

        document.getElementById("tenantPhone")
            .value = tenant.phone;

        document.getElementById("tenantEmail")
            .value = tenant.email;

        document.getElementById("tenantGender")
            .value = tenant.gender;

        document.getElementById("tenantAddress")
            .value = tenant.address;


        // Change form

        document.getElementById(
            "tenantFormTitle"
        ).textContent = "Edit Tenant";


        document.getElementById(
            "tenantSaveButton"
        ).textContent = "Update Tenant";


        document.getElementById(
            "tenantSaveButton"
        ).onclick = function () {

            updateTenant(id);

        };


        showTenantForm();


        document.getElementById(
            "tenantForm"
        ).scrollIntoView({

            behavior: "smooth"

        });


    } catch (error) {

        console.error(
            "Error editing tenant:",
            error
        );

    }

}



// =====================================================
// UPDATE TENANT
// =====================================================

async function updateTenant(id) {

    const tenant = {

        name:
            document.getElementById("tenantName").value,

        phone:
            document.getElementById("tenantPhone").value,

        email:
            document.getElementById("tenantEmail").value,

        gender:
            document.getElementById("tenantGender").value,

        address:
            document.getElementById("tenantAddress").value

    };


    try {

        const response =
            await fetch(
                `/api/tenants/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(tenant)

                }
            );


        if (response.ok) {

            alert(
                "Tenant updated successfully!"
            );

            hideTenantForm();

            loadDashboard();

            loadTenants();


        } else {

            alert(
                "Failed to update tenant."
            );

        }


    } catch (error) {

        console.error(
            "Error updating tenant:",
            error
        );

    }

}



// =====================================================
// DELETE TENANT
// =====================================================

async function deleteTenant(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this tenant?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/tenants/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (response.ok) {

            alert(
                "Tenant deleted successfully!"
            );

            loadDashboard();

            loadTenants();


        } else {

            alert(
                "Failed to delete tenant."
            );

        }


    } catch (error) {

        console.error(
            "Error deleting tenant:",
            error
        );

    }

}



// =====================================================
// ROOM FORM
// =====================================================

function showRoomForm() {

    document.getElementById("roomForm")
        .style.display = "block";

}


function hideRoomForm() {

    document.getElementById("roomForm")
        .style.display = "none";

    resetRoomForm();

}



// =====================================================
// RESET ROOM FORM
// =====================================================

function resetRoomForm() {

    document.getElementById("roomNumber")
        .value = "";

    document.getElementById("roomCapacity")
        .value = "";

    document.getElementById("roomOccupied")
        .value = "";

    document.getElementById("roomRent")
        .value = "";


    document.getElementById("roomFormTitle")
        .textContent = "Add New Room";


    document.getElementById("roomSaveButton")
        .textContent = "Save Room";


    document.getElementById("roomSaveButton")
        .onclick = function () {

            addRoom();

        };

}



// =====================================================
// ADD ROOM
// =====================================================

async function addRoom() {

    const room = {

        roomNumber:
            document.getElementById(
                "roomNumber"
            ).value,

        capacity:
            Number(
                document.getElementById(
                    "roomCapacity"
                ).value
            ),

        occupied:
            Number(
                document.getElementById(
                    "roomOccupied"
                ).value
            ),

        monthlyRent:
            Number(
                document.getElementById(
                    "roomRent"
                ).value
            )

    };


    try {

        const response =
            await fetch("/api/rooms", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(room)

            });


        if (response.ok) {

            alert(
                "Room added successfully!"
            );

            hideRoomForm();

            loadRooms();

            loadDashboard();


        } else {

            alert(
                "Failed to add room."
            );

        }


    } catch (error) {

        console.error(
            "Error adding room:",
            error
        );

    }

}



// =====================================================
// LOAD ROOMS
// =====================================================

async function loadRooms() {

    try {

        const response =
            await fetch("/api/rooms");

        const rooms =
            await response.json();


        const tableBody =
            document.getElementById(
                "roomTableBody"
            );


        tableBody.innerHTML = "";


        rooms.forEach(room => {

            const row = `

                <tr>

                    <td>
                        ${room.roomId}
                    </td>

                    <td>
                        ${room.roomNumber}
                    </td>

                    <td>
                        ${room.capacity}
                    </td>

                    <td>
                        ${room.occupied}
                    </td>

                    <td>
                        ₹${room.monthlyRent}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editRoom(${room.roomId})">

                            Edit

                        </button>


                        <button
                            class="btn btn-danger btn-sm ms-1"
                            onclick="deleteRoom(${room.roomId})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;


            tableBody.innerHTML += row;

        });


    } catch (error) {

        console.error(
            "Error loading rooms:",
            error
        );

    }

}



// =====================================================
// EDIT ROOM
// =====================================================

async function editRoom(id) {

    try {

        const response =
            await fetch("/api/rooms");

        const rooms =
            await response.json();


        const room =
            rooms.find(
                room =>
                    room.roomId === id
            );


        if (!room) {

            alert(
                "Room not found."
            );

            return;

        }


        // Fill form

        document.getElementById(
            "roomNumber"
        ).value = room.roomNumber;


        document.getElementById(
            "roomCapacity"
        ).value = room.capacity;


        document.getElementById(
            "roomOccupied"
        ).value = room.occupied;


        document.getElementById(
            "roomRent"
        ).value = room.monthlyRent;


        // Change form title

        document.getElementById(
            "roomFormTitle"
        ).textContent = "Edit Room";


        // Change button

        document.getElementById(
            "roomSaveButton"
        ).textContent = "Update Room";


        document.getElementById(
            "roomSaveButton"
        ).onclick = function () {

            updateRoom(id);

        };


        showRoomForm();


        document.getElementById(
            "roomForm"
        ).scrollIntoView({

            behavior: "smooth"

        });


    } catch (error) {

        console.error(
            "Error editing room:",
            error
        );

    }

}



// =====================================================
// UPDATE ROOM
// =====================================================

async function updateRoom(id) {

    const room = {

        roomNumber:
            document.getElementById(
                "roomNumber"
            ).value,

        capacity:
            Number(
                document.getElementById(
                    "roomCapacity"
                ).value
            ),

        occupied:
            Number(
                document.getElementById(
                    "roomOccupied"
                ).value
            ),

        monthlyRent:
            Number(
                document.getElementById(
                    "roomRent"
                ).value
            )

    };


    try {

        const response =
            await fetch(
                `/api/rooms/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(room)

                }
            );


        if (response.ok) {

            alert(
                "Room updated successfully!"
            );

            hideRoomForm();

            loadRooms();

            loadDashboard();


        } else {

            alert(
                "Failed to update room."
            );

        }


    } catch (error) {

        console.error(
            "Error updating room:",
            error
        );

    }

}



// =====================================================
// DELETE ROOM
// =====================================================

async function deleteRoom(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this room?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/rooms/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (response.ok) {

            alert(
                "Room deleted successfully!"
            );

            loadRooms();

            loadDashboard();


        } else {

            alert(
                "Failed to delete room."
            );

        }


    } catch (error) {

        console.error(
            "Error deleting room:",
            error
        );

    }

}
// =====================================================
// PAYMENT MANAGEMENT
// =====================================================

function showPaymentForm() {

    document.getElementById("paymentForm")
        .style.display = "block";

}


function hidePaymentForm() {

    document.getElementById("paymentForm")
        .style.display = "none";

    resetPaymentForm();

}


function resetPaymentForm() {

    document.getElementById("paymentTenantId").value = "";

    document.getElementById("paymentAmount").value = "";

    document.getElementById("paymentDate").value = "";

    document.getElementById("paymentMonth").value = "";

    document.getElementById("paymentStatus").value = "";


    document.getElementById("paymentFormTitle")
        .textContent = "Add New Payment";


    document.getElementById("paymentSaveButton")
        .textContent = "Save Payment";


    document.getElementById("paymentSaveButton")
        .onclick = function () {

            addPayment();

        };

}


async function addPayment() {

    const payment = {

        tenantId:
            Number(
                document.getElementById(
                    "paymentTenantId"
                ).value
            ),

        amount:
            Number(
                document.getElementById(
                    "paymentAmount"
                ).value
            ),

        paymentDate:
            document.getElementById(
                "paymentDate"
            ).value,

        paymentMonth:
            document.getElementById(
                "paymentMonth"
            ).value,

        paymentStatus:
            document.getElementById(
                "paymentStatus"
            ).value

    };


    try {

        const response =
            await fetch("/api/payments", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(payment)

            });


        if (response.ok) {

            alert(
                "Payment added successfully!"
            );

            hidePaymentForm();

            loadPayments();

            loadDashboard();

        } else {

            alert(
                "Failed to add payment."
            );

        }

    } catch (error) {

        console.error(
            "Error adding payment:",
            error
        );

    }

}


async function loadPayments() {

    try {

        const response =
            await fetch("/api/payments");

        const payments =
            await response.json();


        const tableBody =
            document.getElementById(
                "paymentTableBody"
            );


        tableBody.innerHTML = "";


        payments.forEach(payment => {

            const row = `

                <tr>

                    <td>${payment.paymentId}</td>

                    <td>${payment.tenantId}</td>

                    <td>₹${payment.amount}</td>

                    <td>${payment.paymentDate}</td>

                    <td>${payment.paymentMonth}</td>

                    <td>${payment.paymentStatus}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editPayment(${payment.paymentId})">

                            Edit

                        </button>

                        <button
                            class="btn btn-danger btn-sm ms-1"
                            onclick="deletePayment(${payment.paymentId})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

            tableBody.innerHTML += row;

        });

    } catch (error) {

        console.error(
            "Error loading payments:",
            error
        );

    }

}


async function editPayment(id) {

    try {

        const response =
            await fetch("/api/payments");

        const payments =
            await response.json();


        const payment =
            payments.find(
                payment =>
                    payment.paymentId === id
            );


        if (!payment) {

            alert("Payment not found.");

            return;

        }


        document.getElementById(
            "paymentTenantId"
        ).value = payment.tenantId;


        document.getElementById(
            "paymentAmount"
        ).value = payment.amount;


        document.getElementById(
            "paymentDate"
        ).value = payment.paymentDate;


        document.getElementById(
            "paymentMonth"
        ).value = payment.paymentMonth;


        document.getElementById(
            "paymentStatus"
        ).value = payment.paymentStatus;


        document.getElementById(
            "paymentFormTitle"
        ).textContent = "Edit Payment";


        document.getElementById(
            "paymentSaveButton"
        ).textContent = "Update Payment";


        document.getElementById(
            "paymentSaveButton"
        ).onclick = function () {

            updatePayment(id);

        };


        showPaymentForm();

    } catch (error) {

        console.error(
            "Error editing payment:",
            error
        );

    }

}


async function updatePayment(id) {

    const payment = {

        tenantId:
            Number(
                document.getElementById(
                    "paymentTenantId"
                ).value
            ),

        amount:
            Number(
                document.getElementById(
                    "paymentAmount"
                ).value
            ),

        paymentDate:
            document.getElementById(
                "paymentDate"
            ).value,

        paymentMonth:
            document.getElementById(
                "paymentMonth"
            ).value,

        paymentStatus:
            document.getElementById(
                "paymentStatus"
            ).value

    };


    try {

        const response =
            await fetch(
                `/api/payments/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(payment)

                }
            );


        if (response.ok) {

            alert(
                "Payment updated successfully!"
            );

            hidePaymentForm();

            loadPayments();

            loadDashboard();

        } else {

            alert(
                "Failed to update payment."
            );

        }

    } catch (error) {

        console.error(
            "Error updating payment:",
            error
        );

    }

}


async function deletePayment(id) {

    if (!confirm(
        "Are you sure you want to delete this payment?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/payments/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (response.ok) {

            alert(
                "Payment deleted successfully!"
            );

            loadPayments();

            loadDashboard();

        } else {

            alert(
                "Failed to delete payment."
            );

        }

    } catch (error) {

        console.error(
            "Error deleting payment:",
            error
        );

    }

}



// =====================================================
// COMPLAINT MANAGEMENT
// =====================================================

function showComplaintForm() {

    document.getElementById("complaintForm")
        .style.display = "block";

}


function hideComplaintForm() {

    document.getElementById("complaintForm")
        .style.display = "none";

    resetComplaintForm();

}


function resetComplaintForm() {

    document.getElementById(
        "complaintTenantId"
    ).value = "";

    document.getElementById(
        "complaintDescription"
    ).value = "";

    document.getElementById(
        "complaintDate"
    ).value = "";

    document.getElementById(
        "complaintStatus"
    ).value = "";


    document.getElementById(
        "complaintFormTitle"
    ).textContent = "Add New Complaint";


    document.getElementById(
        "complaintSaveButton"
    ).textContent = "Save Complaint";


    document.getElementById(
        "complaintSaveButton"
    ).onclick = function () {

        addComplaint();

    };

}


async function addComplaint() {

    const complaint = {

        tenantId:
            Number(
                document.getElementById(
                    "complaintTenantId"
                ).value
            ),

        description:
            document.getElementById(
                "complaintDescription"
            ).value,

        complaintDate:
            document.getElementById(
                "complaintDate"
            ).value,

        status:
            document.getElementById(
                "complaintStatus"
            ).value

    };


    try {

        const response =
            await fetch("/api/complaints", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(complaint)

            });


        if (response.ok) {

            alert(
                "Complaint added successfully!"
            );

            hideComplaintForm();

            loadComplaints();

            loadDashboard();

        } else {

            alert(
                "Failed to add complaint."
            );

        }

    } catch (error) {

        console.error(
            "Error adding complaint:",
            error
        );

    }

}


async function loadComplaints() {

    try {

        const response =
            await fetch("/api/complaints");

        const complaints =
            await response.json();


        const tableBody =
            document.getElementById(
                "complaintTableBody"
            );


        tableBody.innerHTML = "";


        complaints.forEach(complaint => {

            const row = `

                <tr>

                    <td>${complaint.complaintId}</td>

                    <td>${complaint.tenantId}</td>

                    <td>${complaint.description}</td>

                    <td>${complaint.complaintDate}</td>

                    <td>${complaint.status}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editComplaint(${complaint.complaintId})">

                            Edit

                        </button>

                        <button
                            class="btn btn-danger btn-sm ms-1"
                            onclick="deleteComplaint(${complaint.complaintId})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

            tableBody.innerHTML += row;

        });

    } catch (error) {

        console.error(
            "Error loading complaints:",
            error
        );

    }

}


async function editComplaint(id) {

    try {

        const response =
            await fetch("/api/complaints");

        const complaints =
            await response.json();


        const complaint =
            complaints.find(
                complaint =>
                    complaint.complaintId === id
            );


        if (!complaint) {

            alert("Complaint not found.");

            return;

        }


        document.getElementById(
            "complaintTenantId"
        ).value = complaint.tenantId;


        document.getElementById(
            "complaintDescription"
        ).value = complaint.description;


        document.getElementById(
            "complaintDate"
        ).value = complaint.complaintDate;


        document.getElementById(
            "complaintStatus"
        ).value = complaint.status;


        document.getElementById(
            "complaintFormTitle"
        ).textContent = "Edit Complaint";


        document.getElementById(
            "complaintSaveButton"
        ).textContent = "Update Complaint";


        document.getElementById(
            "complaintSaveButton"
        ).onclick = function () {

            updateComplaint(id);

        };


        showComplaintForm();

    } catch (error) {

        console.error(
            "Error editing complaint:",
            error
        );

    }

}


async function updateComplaint(id) {

    const complaint = {

        tenantId:
            Number(
                document.getElementById(
                    "complaintTenantId"
                ).value
            ),

        description:
            document.getElementById(
                "complaintDescription"
            ).value,

        complaintDate:
            document.getElementById(
                "complaintDate"
            ).value,

        status:
            document.getElementById(
                "complaintStatus"
            ).value

    };


    try {

        const response =
            await fetch(
                `/api/complaints/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(complaint)

                }
            );


        if (response.ok) {

            alert(
                "Complaint updated successfully!"
            );

            hideComplaintForm();

            loadComplaints();

            loadDashboard();

        } else {

            alert(
                "Failed to update complaint."
            );

        }

    } catch (error) {

        console.error(
            "Error updating complaint:",
            error
        );

    }

}


async function deleteComplaint(id) {

    if (!confirm(
        "Are you sure you want to delete this complaint?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/complaints/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (response.ok) {

            alert(
                "Complaint deleted successfully!"
            );

            loadComplaints();

            loadDashboard();

        } else {

            alert(
                "Failed to delete complaint."
            );

        }

    } catch (error) {

        console.error(
            "Error deleting complaint:",
            error
        );

    }

}