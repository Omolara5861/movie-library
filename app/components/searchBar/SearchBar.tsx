interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-2 rounded border border-gray-300"
    />
);

export default SearchBar;
