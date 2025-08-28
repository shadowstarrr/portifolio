export default function HeaderSystem() {
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const date = new Date();

    return (
        <div className="flex w-screen h-7 items-center justify-center bg-black/10 backdrop-blur-md">
            <h1 className="text-white text-center">
                {date.getDate()} de {meses[date.getMonth()]} {date.getHours().toString().padStart(2, '0')}:
                {date.getMinutes().toString().padStart(2, '0')}
            </h1>
        </div>
    );
}
