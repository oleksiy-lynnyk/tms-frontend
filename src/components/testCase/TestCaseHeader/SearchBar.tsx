import React, { FC } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'

interface Props {
    value: string
    onChange: (v: string) => void
}

const SearchBar: FC<Props> = ({ value, onChange }) => (
    <InputGroup>
        <Form.Control
            placeholder="Search test cases..."
            value={value}
            onChange={e => onChange(e.target.value)}
        />
        {value && (
            <Button variant="outline-secondary" onClick={() => onChange('')}>
                ×
            </Button>
        )}
    </InputGroup>
)

export default SearchBar
