export const Input = ({type, name, id, value, onChange, required=false, placeholder=""}) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="bg-white border border-blue-500 text-black text-sm rounded-lg focus:ring-[[#2749cf] focus:border-[#2749cf] block w-full p-2.5"
            placeholder={placeholder}
            required={required}
        />
    )
}