import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import UserModal from '../components/UserModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { AppUserFullDTO } from '../types/userTypes';
import { getUsersPaged, createUser, updateUser, deleteUser } from '../api/userApi';
import { useToast } from '../../../contexts/ToastContext';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const UsersView: React.FC = () => {
    const [items, setItems] = useState<AppUserFullDTO[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [search, setSearch] = useState('');
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<AppUserFullDTO | undefined>();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { showSuccess, showError } = useToast();

    const load = async () => {
        try {
            const res = await getUsersPaged(search, page, pageSize);
            setItems(res.content || []);
            setTotalElements(res.totalElements || 0);
            setTotalPages(res.totalPages || 1);
        } catch (error) {
            // Error handled by axios interceptor
        }
    };

    useEffect(() => { load(); }, [page, pageSize, search]);

    const handleSave = async (data: Partial<AppUserFullDTO>, id?: string) => {
        try {
            if (id) {
                await updateUser(id, {
                    ...data,
                    id
                } as AppUserFullDTO);
                showSuccess('User updated successfully');
            } else {
                await createUser({
                    username: data.username || '',
                    fullName: data.fullName || data.username || '',
                    email: data.email || '',
                    role: data.role || ''
                });
                showSuccess('User created successfully');
            }
            setShowModal(false);
            await load();
        } catch (error) {
            // Error handled by axios interceptor
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            showSuccess('User deleted successfully');
            await load();
        } catch (error) {
            // Error handled by axios interceptor
        }
    };

    const columns: ColumnDefinition<AppUserFullDTO>[] = [
        { key: 'username', label: 'Username', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
    ];

    return (
        <div style={{ padding: 16 }}>
            <PageHeader
                title="Users"
                searchValue={search}
                onSearchChange={setSearch}
                onAdd={() => { setEditItem(undefined); setShowModal(true); }}
            />

            <GenericEntityTable<AppUserFullDTO>
                columns={columns}
                items={items}
                currentPage={page}
                pageSize={pageSize}
                totalElements={totalElements}
                totalPages={totalPages}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(0); }}
                onSortChange={() => {}}
                onEdit={item => { setEditItem(item); setShowModal(true); }}
                onDelete={id => setDeleteId(id)}
            />

            {showModal && (
                <UserModal
                    show={showModal}
                    user={editItem}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}

            <DeleteModal
                show={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (deleteId) {
                        await handleDelete(deleteId);
                        setDeleteId(null);
                    }
                }}
                itemName={items.find(u => u.id === deleteId)?.username}
            />
        </div>
    );
};

export default UsersView;
