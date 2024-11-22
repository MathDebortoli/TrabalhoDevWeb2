package trabalho.dev.web.model.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Entity(name="Locacao")
public class LocacaoDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private ClienteDomain cliente;

    @ManyToOne
    @JoinColumn(name = "titulo_id", nullable = false)
    private TituloDomain titulo;

    @Column(nullable = false)
    private LocalDate dataLocacao;

    @Column(nullable = false)
    private LocalDate dataDevolucaoPrevista;

    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private boolean pago;

    public LocacaoDomain() {
    }

    // Construtor com o cálculo da dataDevolucaoPrevista
    public LocacaoDomain(ClienteDomain cliente, TituloDomain titulo, boolean pago) {
        this.cliente = cliente;
        this.titulo = titulo;
        this.dataLocacao = LocalDate.now();
        this.pago = pago;

        this.valor = titulo.getClasse().getValor(); // Valor vem da classe do título


        Date dataClasse = titulo.getClasse().getData();
        if (dataClasse != null) {
            System.out.println("Data da Classe: " + dataClasse);
        } else {
            System.out.println("A data da classe é null");
        }

        if (dataClasse != null) {
            LocalDate localDataClasse = dataClasse.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            long prazoDevolucaoDias = ChronoUnit.DAYS.between(dataLocacao, localDataClasse);
            this.dataDevolucaoPrevista = dataLocacao.plusDays(prazoDevolucaoDias);
        } else {
            this.dataDevolucaoPrevista = LocalDate.now().plusDays(7); // Exemplo: 7 dias de prazo
        }
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ClienteDomain getCliente() {
        return cliente;
    }

    public void setCliente(ClienteDomain cliente) {
        this.cliente = cliente;
    }

    public TituloDomain getTitulo() {
        return titulo;
    }

    public void setTitulo(TituloDomain titulo) {
        this.titulo = titulo;
    }

    public LocalDate getDataLocacao() {
        return dataLocacao;
    }

    public void setDataLocacao(LocalDate dataLocacao) {
        this.dataLocacao = dataLocacao;
    }

    public LocalDate getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public void setDataDevolucaoPrevista(LocalDate dataDevolucaoPrevista) {
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public boolean isPago() {
        return pago;
    }

    public void setPago(boolean pago) {
        this.pago = pago;
    }
}
