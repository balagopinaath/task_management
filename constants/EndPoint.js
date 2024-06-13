const baseUrl = "https://erpsmt.in/user/"
const login = baseUrl + "api/login"

const attendance = baseUrl + "api/attendance"
const getLastAttendance = baseUrl + "api/getMyLastAttendance?UserId="

export default {
    baseUrl,
    login,
    attendance,
    getLastAttendance,
}