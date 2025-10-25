import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import UserModal from '../components/UserModal';
import DeleteModal from '../../../components/common/DeleteModal';
import { AppUserFullDTO } from '../types/userTypes';
import { getUsersPaged, createUser, updateUser, deleteUser } from '../api/userApi';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const UsersView: React.FC = () => {
    const [items, setItems] = useState<AppUserFullDTO[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<AppUserFullDTO | undefined>();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const load = async () => {
        const res = await getUsersPaged(search, page, pageSize);
        setItems(res.content);
    };

    useEffect(() => { load(); }, [page, pageSize, search]);

    const filtered = items.filter(u =>
        (u.username?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
        (u.email?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
        (u.role?.toLowerCase() ?? '').includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    const handleSave = async (data: Partial<AppUserFullDTO>) => {
        if (data.id) {
            await updateUser(data.id, data as AppUserFullDTO);
        } else {
            await createUser({
                username: data.username || '',
                email: data.email || '',
                role: data.role || ''
            });
        }
        setShowModal(false);
        await load();
    };

    const handleDelete = async (id: string) => {
        await deleteUser(id);
        await load();
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
                items={filtered.slice(page * pageSize, (page + 1) * pageSize)}
                currentPage={page}
                pageSize={pageSize}
                totalElements={filtered.length}
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
