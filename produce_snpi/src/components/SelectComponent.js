import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";

const SelectComponent = ({
  label,
  value,
  onChange,
  options,
  multiple = false,
  placeholder,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{
          color: "white",
          "&.Mui-focused": { color: "white" },
        }}
      >
        {label}
      </InputLabel>
      <Select
        multiple={multiple}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val);
        }}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          if (!selected || (Array.isArray(selected) && selected.length === 0)) {
            return <span style={{ color: "#aaa" }}>{placeholder}</span>;
          }

          if (!Array.isArray(selected)) {
            const opt = options.find((o) => o.value === selected);
            return opt ? opt.label : selected;
          }

          return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {selected.map((val) => (
                <Chip
                  key={val}
                  label={options.find((o) => o.value === val)?.label || val}
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                />
              ))}
            </div>
          );
        }}
        sx={{
          color: "white",
          ".MuiSvgIcon-root": { color: "white" },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.5)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              fontSize: "12px",
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.2) !important",
                color: "black !important",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(255,255,255,0.3) !important",
                color: "black !important",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "black !important",
              },
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
