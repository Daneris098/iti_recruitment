import { ResetCredentialForm, user, UserForm } from "@modules/AdministratorSettings/types";

export const selectedDataInitialVal: user = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    status: ''
}

export const UserFormVal: UserForm = {
    firstName: "",
    middleName: "",
    lastName: "",
    extension: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
    isGenerated: true
}

export const ResetCredentialFormVal: ResetCredentialForm = {
    username: "",
    email: "",
    password: "",
    rePassword: "",
}
