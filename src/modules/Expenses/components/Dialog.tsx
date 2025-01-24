import { Button, Modal, NumberInput, TextInput } from "@mantine/core";
import Swal from "sweetalert2";
import axiosInstance from "@src/api";
import { useForm } from "@mantine/form";
import { FormData } from "@src/modules/Expenses/types";
import { DialogStore, DataTableStore } from "@src/modules/Expenses/store"
import { selectedDataVal } from "@src/modules/Expenses/values";
import { useEffect } from "react";
export default function Dialog() {
    const {
        action, selectedData, loading,
        setAction, setSelectedData, setLoading } = DialogStore()
    const { setRefresh } = DataTableStore()


    const form = useForm({
        initialValues: { title: "", amount: 0 },
        validate: {
            title: (value: string) => {
                if (value.length <= 0) {
                    return "Title cannot be empty";
                } else if (value.length < 2) {
                    return "Title must have at least 2 characters";
                }
            },
            amount: (value: number) => {
                if (value <= 0) {
                    return "Amount must be greater than zero";
                }
            },
        },
    });

    const onSubmit = async (params: FormData) => {
        setLoading(true)
        const payload = {
            title: params.title,
            amount: params.amount,
        };
        if (action == 'New') {
            await axiosInstance
                .post("createExpenses", payload)
                .then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Expense created successfully!",
                            timer: 1500, 
                            showConfirmButton: false, 
                        });
                        
                        setRefresh(true)
                        setAction('');
                        setSelectedData(selectedDataVal);
                        form.reset();
                    }
                })
                .catch((error) => {
                    const message = error.response?.data?.message || "Something went wrong!";
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: message,
                    });
                })
                .finally(() => {
                    setLoading(false)
                });
        }
        else if (action == 'Update') {
            await axiosInstance
                .put(`updateExpenseById/${selectedData._id}`, payload)
                .then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Expense updated successfully!",
                            timer: 1500, 
                            showConfirmButton: false, 
                        });
                        setRefresh(true)
                        setAction('');
                        form.reset();
                    }
                })
                .catch((error) => {
                    const message = error.response?.data?.message || "Something went wrong!";
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: message,
                    });
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    };

    useEffect(() => {
        if (action == 'Update') {
            console.log(selectedData)
            form.setValues({
                title: selectedData.title,
                amount: selectedData.amount
            })
        }
    }, [action, selectedData])

    return (
        <Modal
            opened={action === "New" || action === "Update"}
            onClose={() => setAction("")}
            title={`${action} Expenses`}
            centered
            size="xl"
            padding={30}
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 rounded-lg">
                    <TextInput
                        variant="filled"
                        size="md"
                        radius="md"
                        placeholder="Enter Title"
                        {...form.getInputProps("title")}
                    />
                    <NumberInput
                        variant="filled"
                        size="md"
                        radius="md"
                        placeholder="Enter Amount"
                        {...form.getInputProps("amount")}
                    />
                    <Button type="submit" className="border-none bg-blue-300 poppins text-white" loading={loading} loaderProps={{ type: 'dots' }}>
                        Submit
                    </Button>
                </div>
            </form>
        </Modal>
    );
}