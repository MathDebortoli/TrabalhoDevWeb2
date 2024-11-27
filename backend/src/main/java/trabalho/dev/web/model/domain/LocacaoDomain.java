package trabalho.dev.web.model.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.Date;

@Entity(name="locacao")
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
    private Date dataLocacao;

    @JsonProperty("devolucaoPrevista")
    @Column(nullable = false)
    private Date dataDevolucaoPrevista;

    @JsonProperty("valorPrevisto")
    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private boolean pago;

    public LocacaoDomain() {
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

    public Date getDataLocacao() {
        return dataLocacao;
    }

    public void setDataLocacao(Date dataLocacao) {
        this.dataLocacao = dataLocacao;
    }

    public Date getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public void setDataDevolucaoPrevista(Date dataDevolucaoPrevista) {
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

    @Override
    public String toString() {
        return "LocacaoDomain{" +
                "id=" + id +
                ", cliente=" + cliente +
                ", titulo=" + titulo +
                ", dataLocacao=" + dataLocacao +
                ", dataDevolucaoPrevista=" + dataDevolucaoPrevista +
                ", valor=" + valor +
                ", pago=" + pago +
                '}';
    }

}
