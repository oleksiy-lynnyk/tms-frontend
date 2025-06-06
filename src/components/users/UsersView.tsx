import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUsersPaged, createUser, updateUser, deleteUser } from '../../api/userApi';
import type { UserFullDTO } from '../../types';
import UserModal from './UserModal';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import Pagination from '../common/Pagination';
import UserTable from './UserTable';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const UsersView: React.FC = () => {
    const [users, setUsers] = useState<UserFullDTO[]>([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState<UserFullDTO | undefined>(undefined);
    const [deleteUserCandidate, setDeleteUserCandidate] = useState<UserFullDTO | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [search, currentPage, pageSize]);

    const fetchUsers = async () => {
        try {
            const data = await getUsersPaged(search, currentPage - 1, pageSize);
            setUsers(data.content || []);
            setTotalPages(data.totalPages || 1);
            setTotalElements(data.totalElements || 0);
        } catch {
            setUsers([]);
            setTotalElements(0);
        }
    };

    const handleModalSave = async (dto: Omit<UserFullDTO, 'id'>, id?: string) => {
        if (id) {
            await updateUser(id, dto);
        } else {
            await createUser(dto);
        }
        setShowModal(false);
        setEditUser(undefined);
        await fetchUsers();
    };

    const handleDelete = async () => {
        if (deleteUserCandidate) {
            await deleteUser(deleteUserCandidate.id);
            setDeleteUserCandidate(undefined);
            await fetchUsers();
        }
    };

    return (
        <div className="container-fluid py-4" style={{ minHeight: '100vh' }}>
            <div className="mx-auto" style={{ maxWidth: 2400 }}>
                {/* Хедер сторінки */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div style={{ maxWidth: 400 }}>
                        <input
                            className="form-control"
                            placeholder="Search users by name or email"
                            value={search}
                            onChange={e => { setCurrentPage(1); setSearch(e.target.value); }}
                        />
                    </div>
                    <Button onClick={() => { setEditUser(undefined); setShowModal(true); }}>
                        + New User
                    </Button>
                </div>
                {/* Таблиця користувачів */}
                <div className="table-responsive">
                    <UserTable
                        users={users}
                        onEdit={user => { setEditUser(user); setShowModal(true); }}
                        onDelete={user => setDeleteUserCandidate(user)}
                    />
                </div>
                {/* Під таблицею: інформація про кількість + пагінація */}
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        {`Показано ${users.length} з ${totalElements} користувачів`}
                    </div>
                    <div className="d-flex align-items-center">
                        <select
                            value={pageSize}
                            onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                            className="form-select me-2"
                            style={{ width: 120 }}
                        >
                            {PAGE_SIZE_OPTIONS.map(sz => <option key={sz} value={sz}>{sz} per page</option>)}
                        </select>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            {/* Модалки */}
            <UserModal
                show={showModal}
                onClose={() => { setShowModal(false); setEditUser(undefined); }}
                user={editUser}
                onSave={handleModalSave}
            />
            <DeleteConfirmModal
                show={!!deleteUserCandidate}
                onClose={() => setDeleteUserCandidate(undefined)}
                onConfirm={handleDelete}
                itemName={deleteUserCandidate?.name}
            />
        </div>
    );
};

export default UsersView;
