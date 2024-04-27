import { atomWithStorage } from "jotai/utils"

export const currentUserAtom = atomWithStorage('currentUser', {
    usernmae: '',
    avatar: '',
    _id: ''
})