import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

function Software() {
  const [softwares, setSoftwares] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    skills: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    phoneNo: "",
    email: "",
    qualifications: ""
  });

  // Fetch all records
  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/getAll")
      .then(res => setSoftwares(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save new record
  const handleSubmit = () => {
    axios.post("http://localhost:8080/api/v1/add", form, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        setSoftwares([...softwares, res.data]);
        resetForm();
      })
      .catch(err => console.error(err));
  };

  // Update record
  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/v1/update/${form.id}`, form, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        setSoftwares(softwares.map(s => (s.id === form.id ? res.data : s)));
        resetForm();
      })
      .catch(err => console.error(err));
  };

  // Delete record
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/v1/delete/${id}`)
      .then(() => setSoftwares(softwares.filter(s => s.id !== id)))
      .catch(err => console.error(err));
  };

  // Load record into form for editing
  const handleEdit = (software) => {
    setForm(software);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      skills: "",
      experience: "",
      currentSalary: "",
      expectedSalary: "",
      phoneNo: "",
      email: "",
      qualifications: ""
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Software Records Management
      </Typography>

      {/* Form Section */}
      <Paper style={{ padding: 20, marginBottom: 30 }}>
        <Typography variant="h6" gutterBottom>
          {form.id ? "Update Software" : "Add New Software"}
        </Typography>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField label="ID" name="id" value={form.id} onChange={handleChange} disabled />
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Skills" name="skills" value={form.skills} onChange={handleChange} />
          <TextField label="Experience" name="experience" value={form.experience} onChange={handleChange} />
          <TextField label="Current Salary" name="currentSalary" value={form.currentSalary} onChange={handleChange} />
          <TextField label="Expected Salary" name="expectedSalary" value={form.expectedSalary} onChange={handleChange} />
          <TextField label="Phone No" name="phoneNo" value={form.phoneNo} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField label="Qualifications" name="qualifications" value={form.qualifications} onChange={handleChange} />
        </Box>
        <Box mt={2}>
          {form.id ? (
            <Button variant="contained" color="secondary" onClick={handleUpdate}>
              Update Record
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Record
            </Button>
          )}
          <Button variant="outlined" onClick={resetForm} style={{ marginLeft: 10 }}>
            Clear
          </Button>
        </Box>
      </Paper>

      {/* Table Section */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Skills</b></TableCell>
              <TableCell><b>Experience</b></TableCell>
              <TableCell><b>Qualifications</b></TableCell>
              <TableCell><b>Salary</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {softwares.map(s => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.skills}</TableCell>
                <TableCell>{s.experience}</TableCell>
                <TableCell>{s.qualifications}</TableCell>
                <TableCell>{s.currentSalary} / {s.expectedSalary}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.phoneNo}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(s)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(s.id)} style={{ marginLeft: 2 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Software;
