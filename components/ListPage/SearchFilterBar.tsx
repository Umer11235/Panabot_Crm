type FilterOption = {
  value: string;
  label: string;
};

type SearchFilterBarClasses = {
  searchBar: string;
  searchInput: string;
  filterDropdown: string;
  filterBtn: string;
  filterMenu: string;
  show: string;
  active: string;
};

type SearchFilterBarProps = {
  classes: SearchFilterBarClasses;
  searchPlaceholder: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterLabel: string;
  filterOpen: boolean;
  onToggleFilter: () => void;
  filterValue: string;
  filterOptions: FilterOption[];
  onSelectFilter: (value: string) => void;
};

export default function SearchFilterBar({
  classes,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  filterLabel,
  filterOpen,
  onToggleFilter,
  filterValue,
  filterOptions,
  onSelectFilter,
}: SearchFilterBarProps) {
  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={classes.searchInput}
      />
      <div className={classes.filterDropdown}>
        <button className={classes.filterBtn} onClick={onToggleFilter}>
          {filterLabel}
        </button>
        <div className={`${classes.filterMenu} ${filterOpen ? classes.show : ""}`}>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={filterValue === option.value ? classes.active : ""}
              onClick={() => onSelectFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
